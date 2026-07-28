"""Find the Footsteps app record and report build processing state."""
import time, pathlib, sys
import jwt, requests

KEY_ID = "P4QNC2CX4T"
ISSUER = "3bed938b-80ba-4f75-a6ef-8199ac4c4ef2"
KEY = pathlib.Path.home() / ".appstoreconnect/private_keys" / f"AuthKey_{KEY_ID}.p8"
BUNDLE = "com.bestrongagain.footsteps"

tok = jwt.encode(
    {"iss": ISSUER, "iat": int(time.time()), "exp": int(time.time()) + 600,
     "aud": "appstoreconnect-v1"},
    KEY.read_text(), algorithm="ES256", headers={"kid": KEY_ID, "typ": "JWT"})
h = {"Authorization": f"Bearer {tok}"}
B = "https://api.appstoreconnect.apple.com/v1"

r = requests.get(f"{B}/apps", params={"limit": 200}, headers=h, timeout=30)
if r.status_code >= 300:
    print("HTTP", r.status_code, r.text[:400]); sys.exit(1)

app = None
for a in r.json().get("data", []):
    if a["attributes"].get("bundleId") == BUNDLE:
        app = a
if not app:
    print(f"no app record found for {BUNDLE} yet"); sys.exit(1)

print(f"app: {app['attributes'].get('name')}  Apple ID {app['id']}  sku={app['attributes'].get('sku')}")

r = requests.get(f"{B}/builds", params={"filter[app]": app["id"], "limit": 5}, headers=h, timeout=30)
builds = r.json().get("data", []) if r.status_code < 300 else []
if not builds:
    print("  builds: none visible yet — Apple is still processing the upload")
for b in builds:
    at = b["attributes"]
    print(f"  build {at.get('version')}  state={at.get('processingState')}  "
          f"uploaded={at.get('uploadedDate')}  minOS={at.get('minOsVersion')}")

r = requests.get(f"{B}/apps/{app['id']}/appStoreVersions", params={"limit": 3}, headers=h, timeout=30)
for v in (r.json().get("data", []) if r.status_code < 300 else []):
    at = v["attributes"]
    print(f"  version {at.get('versionString')}  state={at.get('appStoreState')}")
