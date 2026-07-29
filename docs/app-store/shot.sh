#!/bin/zsh
# shot.sh <output-name> <delay-seconds> <js-to-run-after-load>
# Patches the installed app bundle's index.html with an auto-run snippet,
# relaunches, waits, and captures a 1320x2868 screenshot.
set -e
SP=/private/tmp/claude-501/-Users-glenrogers/b8d0924a-63c5-4fe8-b377-6ae3d4b083ad/scratchpad
D="iPhone 17 Pro Max"
BUNDLE=com.bestrongagain.footsteps
C=$(xcrun simctl get_app_container "$D" $BUNDLE)
IDX="$C/public/index.html"

NAME=$1
DELAY=$2
JS=$3

# keep a pristine copy the first time
[[ -f "$SP/index.pristine.html" ]] || cp "$IDX" "$SP/index.pristine.html"

cp "$SP/index.pristine.html" "$IDX"
if [[ -n "$JS" ]]; then
  python3 - "$IDX" "$JS" <<'PY'
import sys
idx, js = sys.argv[1], sys.argv[2]
html = open(idx).read()
snippet = "\n<script>window.addEventListener('load',function(){setTimeout(function(){try{%s}catch(e){document.title='ERR '+e.message}},400)});</script>\n" % js
html = html.replace('</body>', snippet + '</body>')
open(idx, 'w').write(html)
PY
fi

xcrun simctl terminate "$D" $BUNDLE 2>/dev/null || true
xcrun simctl launch "$D" $BUNDLE > /dev/null
python3 -c "import time,sys; time.sleep(float(sys.argv[1]))" "$DELAY"
mkdir -p "$SP/shots"
xcrun simctl io "$D" screenshot "$SP/shots/$NAME.png" > /dev/null 2>&1
sips -g pixelWidth -g pixelHeight "$SP/shots/$NAME.png" | tail -2 | tr '\n' ' '
echo "-> $NAME.png"
