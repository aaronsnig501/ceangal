#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FONT_PATH="$ROOT_DIR/assets/fonts/UncialAntiqua-Regular.ttf"
TMP_DIR="$ROOT_DIR/tmp-icons"
PUBLIC_DIR="$ROOT_DIR/public"
ANDROID_RES_DIR="$ROOT_DIR/android/app/src/main/res"

BG="#1e1c18"
CREAM="#f4f0e6"
VERMIL="#c8381a"

require_bin() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_bin magick

if [[ ! -f "$FONT_PATH" ]]; then
  echo "Missing font file at $FONT_PATH" >&2
  exit 1
fi

mkdir -p "$TMP_DIR" "$PUBLIC_DIR"

full_word_icon() {
  local size="$1"
  local output="$2"
  local point_size="$(( size * 23 / 100 ))"
  local offset="$(( size * 13 / 100 ))"

  magick \
    -size "${size}x${size}" "xc:${BG}" \
    -font "$FONT_PATH" \
    -fill "$CREAM" \
    -gravity center \
    -pointsize "$point_size" \
    -annotate "+0-$offset" "Cean" \
    -fill "$VERMIL" \
    -annotate "+0+$offset" "gal" \
    "PNG24:${output}"
}

initial_icon() {
  local size="$1"
  local output="$2"
  local point_size="$(( size * 72 / 100 ))"
  local y_offset="$(( size * 2 / 100 ))"

  magick \
    -size "${size}x${size}" "xc:${BG}" \
    -font "$FONT_PATH" \
    -fill "$CREAM" \
    -gravity center \
    -pointsize "$point_size" \
    -annotate "+0+$y_offset" "C" \
    "PNG24:${output}"
}

transparent_full_word_icon() {
  local size="$1"
  local output="$2"
  local point_size="$(( size * 23 / 100 ))"
  local offset="$(( size * 13 / 100 ))"

  magick \
    -size "${size}x${size}" xc:none \
    -font "$FONT_PATH" \
    -fill "$CREAM" \
    -gravity center \
    -pointsize "$point_size" \
    -annotate "+0-$offset" "Cean" \
    -fill "$VERMIL" \
    -annotate "+0+$offset" "gal" \
    "$output"
}

transparent_initial_icon() {
  local size="$1"
  local output="$2"
  local point_size="$(( size * 72 / 100 ))"
  local y_offset="$(( size * 2 / 100 ))"

  magick \
    -size "${size}x${size}" xc:none \
    -font "$FONT_PATH" \
    -fill "$CREAM" \
    -gravity center \
    -pointsize "$point_size" \
    -annotate "+0+$y_offset" "C" \
    "$output"
}

copy_flat_android_icon() {
  local size="$1"
  local target_dir="$2"
  local output="$TMP_DIR/android-flat-${size}.png"

  if (( size >= 144 )); then
    full_word_icon "$size" "$output"
  else
    initial_icon "$size" "$output"
  fi

  cp "$output" "$target_dir/ic_launcher.png"
  cp "$output" "$target_dir/ic_launcher_round.png"
}

copy_foreground_android_icon() {
  local size="$1"
  local target_dir="$2"
  local output="$TMP_DIR/android-foreground-${size}.png"

  if (( size >= 144 )); then
    transparent_full_word_icon "$size" "$output"
  else
    transparent_initial_icon "$size" "$output"
  fi

  cp "$output" "$target_dir/ic_launcher_foreground.png"
}

full_word_icon 1024 "$PUBLIC_DIR/ceangal-app-store-icon-1024.png"
full_word_icon 512 "$PUBLIC_DIR/ceangal-play-store-icon-512.png"
full_word_icon 192 "$PUBLIC_DIR/ceangal-android-launcher-192.png"
full_word_icon 180 "$PUBLIC_DIR/apple-touch-icon.png"
full_word_icon 144 "$PUBLIC_DIR/ceangal-android-launcher-144.png"
initial_icon 96 "$PUBLIC_DIR/ceangal-android-launcher-96.png"
initial_icon 72 "$PUBLIC_DIR/ceangal-android-launcher-72.png"
initial_icon 48 "$PUBLIC_DIR/ceangal-android-launcher-48.png"
initial_icon 32 "$PUBLIC_DIR/favicon-32x32.png"
initial_icon 16 "$PUBLIC_DIR/favicon-16x16.png"
full_word_icon 512 "$PUBLIC_DIR/favicon.png"

magick "$PUBLIC_DIR/favicon-32x32.png" "$PUBLIC_DIR/favicon-16x16.png" "$PUBLIC_DIR/favicon.ico"

copy_flat_android_icon 192 "$ANDROID_RES_DIR/mipmap-xxxhdpi"
copy_flat_android_icon 144 "$ANDROID_RES_DIR/mipmap-xxhdpi"
copy_flat_android_icon 96 "$ANDROID_RES_DIR/mipmap-xhdpi"
copy_flat_android_icon 72 "$ANDROID_RES_DIR/mipmap-hdpi"
copy_flat_android_icon 48 "$ANDROID_RES_DIR/mipmap-mdpi"

copy_foreground_android_icon 192 "$ANDROID_RES_DIR/mipmap-xxxhdpi"
copy_foreground_android_icon 144 "$ANDROID_RES_DIR/mipmap-xxhdpi"
copy_foreground_android_icon 96 "$ANDROID_RES_DIR/mipmap-xhdpi"
copy_foreground_android_icon 72 "$ANDROID_RES_DIR/mipmap-hdpi"
copy_foreground_android_icon 48 "$ANDROID_RES_DIR/mipmap-mdpi"

cp "$PUBLIC_DIR/ceangal-app-store-icon-1024.png" "$TMP_DIR/ceangal-app-store-icon-1024.png"
