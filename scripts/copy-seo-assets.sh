#!/usr/bin/env sh

set -eu

mkdir -p dist

cp public/favicon.svg dist/favicon.svg
cp public/favicon-32x32.png dist/favicon-32x32.png
cp public/apple-touch-icon.png dist/apple-touch-icon.png
cp public/ceangal-social-card.png dist/ceangal-social-card.png
cp public/robots.txt dist/robots.txt
cp public/sitemap.xml dist/sitemap.xml
