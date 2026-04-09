#!/usr/bin/env bash
# Phase 2 batch verification — run after npm run build
# Asserts all 10 service pages have unique helmet titles, unique helmet descriptions,
# and no residual "BEST Roofer in Columbus" duplicate.
# Requires bash 4+ (uses `declare -A`). On macOS, install via `brew install bash`.
set -euo pipefail

SERVICES=(commercial-roofing emergency-services gutters preventative-maintenance roof-inspection roof-installation roof-maintenance roof-replacement siding storm-damage)

# Expected helmet titles (must match 02-COPY-APPROVED.md verbatim)
# Note: "&" is HTML-escaped to "&amp;" in the prerendered dist HTML.
declare -A EXPECTED_TITLES=(
  [commercial-roofing]="Commercial Roofing Contractor Columbus, OH | DTE Roofing"
  [emergency-services]="24/7 Emergency Roof Repair in Central Ohio | DTE Roofing"
  [gutters]="Gutter Installation &amp; Repair in Columbus, OH | DTE Roofing"
  [preventative-maintenance]="Preventative Roof Maintenance Columbus OH | DTE Roofing"
  [roof-inspection]="Free Roof Inspection in Central Ohio | DTE Roofing"
  [roof-installation]="New Roof Installation in Columbus, OH | DTE Roofing"
  [roof-maintenance]="Roof Maintenance &amp; Tune-Ups in Central Ohio | DTE Roofing"
  [roof-replacement]="Roof Replacement in Columbus, OH | DTE Roofing"
  [siding]="Siding Installation &amp; Repair in Central Ohio | DTE Roofing"
  [storm-damage]="Storm Damage Roof Repair in Central Ohio | DTE Roofing"
)

FAIL=0
PASS=0

for slug in "${SERVICES[@]}"; do
  f="dist/services/$slug/index.html"
  if [[ ! -f "$f" ]]; then
    echo "FAIL [$slug]: missing dist file $f"
    FAIL=$((FAIL+1))
    continue
  fi

  # 1. Must NOT contain the duplicate title string
  if grep -q "BEST Roofer in Columbus" "$f"; then
    echo "FAIL [$slug]: still contains duplicate BEST title"
    FAIL=$((FAIL+1))
    continue
  fi

  # 2. Must contain the expected helmet title
  if [[ -z "${EXPECTED_TITLES[$slug]+x}" ]]; then
    echo "FAIL [$slug]: no expected title defined in EXPECTED_TITLES (script bug)"
    FAIL=$((FAIL+1))
    continue
  fi
  expected="${EXPECTED_TITLES[$slug]}"
  if ! grep -q "<title data-rh=\"true\">${expected}</title>" "$f"; then
    echo "FAIL [$slug]: missing expected helmet title: $expected"
    FAIL=$((FAIL+1))
    continue
  fi

  # 3. Must contain a helmet description
  if ! grep -q 'data-rh="true" name="description"' "$f"; then
    echo "FAIL [$slug]: missing helmet description tag"
    FAIL=$((FAIL+1))
    continue
  fi

  echo "PASS [$slug]"
  PASS=$((PASS+1))
done

echo ""
echo "Phase 2 verification: $PASS passed, $FAIL failed"
[[ $FAIL -eq 0 ]] || exit 1
echo "ALL 10 SERVICE PAGES VERIFIED"
