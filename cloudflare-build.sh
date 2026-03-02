#!/bin/bash
# cloudflare-build.sh – fetch notes from private repo, then build with Quartz

echo "📦 Cloning private notes repo..."
git clone https://$NOTES_TOKEN@github.com/08061991/the-las-obs.note-private.git temp_notes

echo "📋 Copying notes to content/ folder..."
rm -rf content/*
cp -r temp_notes/* content/

echo "🏗️ Building site with Quartz..."
npx quartz build

echo "✅ Build complete"
