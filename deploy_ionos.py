"""
Deploy Astro-Build (dist/) per SFTP zu IONOS.

Benoetigt ENV-Variablen:
  IONOS_SFTP_HOST   z.B. home362401740.1and1-data.host
  IONOS_SFTP_USER   z.B. u62702423
  IONOS_SFTP_PASS   das SFTP-Passwort
  IONOS_SFTP_REMOTE Remote-Pfad, default /LIARastro
  LOCAL_DIST_DIR    Lokales Build-Verzeichnis, default ./dist

Lokal: zuerst `npm run build`, dann `python deploy_ionos.py`
       Variablen via .env oder Powershell-Env setzen.
GitHub Action: Variablen kommen aus Repo-Secrets.
"""
import os
import sys
import paramiko


def env_required(key: str) -> str:
    val = os.environ.get(key)
    if not val:
        sys.exit(f"FEHLER: ENV-Variable {key} nicht gesetzt.")
    return val


SFTP_HOST = env_required("IONOS_SFTP_HOST")
SFTP_USER = env_required("IONOS_SFTP_USER")
SFTP_PASS = env_required("IONOS_SFTP_PASS")
REMOTE_DIR = os.environ.get("IONOS_SFTP_REMOTE", "/LIARastro")
LOCAL_DIR = os.environ.get("LOCAL_DIST_DIR", "dist")

if not os.path.isdir(LOCAL_DIR):
    sys.exit(f"FEHLER: Lokales Build-Verzeichnis '{LOCAL_DIR}' existiert nicht. Erst 'npm run build' ausfuehren.")


def ensure_remote_dir(sftp, remote_path):
    dirs_to_create = []
    path = remote_path
    while path and path != "/":
        try:
            sftp.stat(path)
            break
        except FileNotFoundError:
            dirs_to_create.append(path)
            path = os.path.dirname(path)
    for d in reversed(dirs_to_create):
        try:
            sftp.mkdir(d)
        except Exception:
            pass


def upload_directory(sftp, local_dir, remote_dir):
    count = 0
    errors = 0
    for root, dirs, files in os.walk(local_dir):
        rel_path = os.path.relpath(root, local_dir)
        current_remote = remote_dir if rel_path == "." else remote_dir + "/" + rel_path.replace(os.sep, "/")
        ensure_remote_dir(sftp, current_remote)
        for f in files:
            local_file = os.path.join(root, f)
            remote_file = current_remote + "/" + f
            try:
                sftp.put(local_file, remote_file)
                count += 1
                if count % 50 == 0:
                    print(f"  Uploaded {count} files...")
            except Exception as e:
                print(f"  ERROR uploading {remote_file}: {e}")
                errors += 1
    return count, errors


print(f"Connecting to {SFTP_HOST}...")
transport = paramiko.Transport((SFTP_HOST, 22))
transport.connect(username=SFTP_USER, password=SFTP_PASS)
sftp = paramiko.SFTPClient.from_transport(transport)
print(f"Connected. Uploading from '{LOCAL_DIR}' to '{REMOTE_DIR}'...")

# Clean old CSS first (Astro generates hashed names; old hashes would otherwise pile up)
try:
    astro_files = sftp.listdir(REMOTE_DIR + "/_astro")
    old_css = [f for f in astro_files if f.endswith(".css")]
    for f in old_css:
        remote_path = REMOTE_DIR + "/_astro/" + f
        print(f"  Removing old CSS: {f}")
        sftp.remove(remote_path)
except Exception as e:
    print(f"  Note: {e}")

count, errors = upload_directory(sftp, LOCAL_DIR, REMOTE_DIR)
print(f"\nDone. Uploaded {count} files, {errors} errors.")

sftp.close()
transport.close()

if errors > 0:
    sys.exit(1)
