#!/bin/sh
# Builds the Chrome Web Store upload: dist/nerfed-<version>.zip.
# Only files the extension loads are included (no README, store assets or
# icon source).
set -eu
cd "$(dirname "$0")/.."

version=$(sed -n 's/^ *"version": *"\([^"]*\)".*/\1/p' manifest.json)
out="dist/nerfed-$version.zip"

mkdir -p dist
rm -f "$out"
zip -q -X "$out" manifest.json popup.html ./*.js ./*.css icons/*.png

echo "$out"
unzip -l "$out" | tail -n +4 | sed '$d' | sed '$d' | awk '{ print "  " $4 }'
