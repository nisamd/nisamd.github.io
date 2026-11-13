#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
build_dir=$(mktemp -d)
trap 'rm -rf "$build_dir"' EXIT
cd public-resume
pdflatex -halt-on-error -interaction=batchmode -output-directory="$build_dir" main.tex
pdflatex -halt-on-error -interaction=batchmode -output-directory="$build_dir" main.tex
cp "$build_dir/main.pdf" ../static/nima-samadi-resume.pdf
