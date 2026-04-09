#!/usr/bin/env bash
# Phase 3 batch verification — run after npm run build
# Asserts all 6 core pages have unique helmet titles, descriptions, and no superlatives.
# Requires bash 4+ (uses `declare -A`). On macOS, install via `brew install bash`.
set -euo pipefail

PAGES=(about gallery reviews faq contact get-a-quote-consultation)

declare -A EXPECTED_TITLES=(
  [about]="About DTE Roofing | Family-Owned Roofer in Columbus, OH"
  [gallery]="Roofing Project Gallery | DTE Roofing Columbus, OH"
  [reviews]="DTE Roofing Reviews | Central Ohio Homeowners Speak Out"
  [faq]="Roofing FAQs | Questions Answered by DTE Roofing Columbus"
  [contact]="Contact DTE Roofing | Free Estimates in Columbus, OH"
  [get-a-quote-consultation]="Get an Instant Roof Quote | DTE Roofing Columbus, OH"
)

FAIL=0
PASS=0

for slug in "${PAGES[@]}"; do
  f="dist/$slug/index.html"
  if [[ ! -f "$f" ]]; then
    echo "FAIL [$slug]: missing dist file $f"
    FAIL=$((FAIL+1))
    continue
  fi

  # 1. Must NOT contain the duplicate "BEST Roofer" title
  if grep -q "BEST Roofer in Columbus" "$f"; then
    echo "FAIL [$slug]: still contains duplicate BEST title"
    FAIL=$((FAIL+1))
    continue
  fi

  # 2. Must NOT contain superlative violations in <head> metadata
  # (body copy is out of scope for Phase 03 per plan constraints)
  head_block=$(sed -n '/<head>/,/<\/head>/p' "$f")
  if echo "$head_block" | grep -q "most trusted"; then
    echo "FAIL [$slug]: contains 'most trusted' superlative in <head>"
    FAIL=$((FAIL+1))
    continue
  fi
  if echo "$head_block" | grep -q "highest-rated"; then
    echo "FAIL [$slug]: contains 'highest-rated' superlative in <head>"
    FAIL=$((FAIL+1))
    continue
  fi

  # 3. Must contain the expected helmet title
  if [[ -z "${EXPECTED_TITLES[$slug]+x}" ]]; then
    echo "FAIL [$slug]: no expected title defined (script bug)"
    FAIL=$((FAIL+1))
    continue
  fi
  expected="${EXPECTED_TITLES[$slug]}"
  if ! grep -q "<title data-rh=\"true\">${expected}</title>" "$f"; then
    echo "FAIL [$slug]: missing expected helmet title: $expected"
    FAIL=$((FAIL+1))
    continue
  fi

  # 4. Must contain a helmet description
  if ! grep -q 'data-rh="true" name="description"' "$f"; then
    echo "FAIL [$slug]: missing helmet description tag"
    FAIL=$((FAIL+1))
    continue
  fi

  echo "PASS [$slug]"
  PASS=$((PASS+1))
done

echo ""
echo "Phase 3 verification: $PASS passed, $FAIL failed"
[[ $FAIL -eq 0 ]] || exit 1
echo "ALL 6 CORE PAGES VERIFIED"
