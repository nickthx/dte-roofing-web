#!/usr/bin/env bash
# Phase 4 batch verification — run after npm run build
# Asserts all 13 location pages have unique helmet descriptions, approved H1s & H2s, no superlatives.
# Requires bash 4+ (uses `declare -A`). On macOS, install via `brew install bash`.
set -euo pipefail

PAGES=(columbus delaware dublin gahanna grove-city hilliard new-albany pickerington powell reynoldsburg upper-arlington westerville worthington)

declare -A EXPECTED_H1=(
  [columbus]="Roof Repair & Replacement in Columbus, OH"
  [delaware]="Roof Repair & Replacement in Delaware, OH"
  [dublin]="Roof Repair & Replacement in Dublin, OH"
  [gahanna]="Roof Repair & Replacement in Gahanna, OH"
  [grove-city]="Roof Repair & Replacement in Grove City, OH"
  [hilliard]="Roof Repair & Replacement in Hilliard, OH"
  [new-albany]="Roof Repair & Replacement in New Albany, OH"
  [pickerington]="Roof Repair & Replacement in Pickerington, OH"
  [powell]="Roof Repair & Replacement in Powell, OH"
  [reynoldsburg]="Roof Repair & Replacement in Reynoldsburg, OH"
  [upper-arlington]="Roof Repair & Replacement in Upper Arlington, OH"
  [westerville]="Roof Repair & Replacement in Westerville, OH"
  [worthington]="Roof Repair & Replacement in Worthington, OH"
)

declare -A EXPECTED_H2_KEY=(
  [columbus]="Storm Damage, Commercial Roofing, Gutter Installation"
  [delaware]="Storm Damage, Wind Damage, Leak Repair"
  [dublin]="Commercial Roofing, Metal Shingles, Gutter Services"
  [gahanna]="Commercial Roofing, Gutter Installation, Storm Damage & Hail Repair"
  [grove-city]="Gutter Installation, Gutter Guards, Storm Damage & Hail Repair"
  [hilliard]="Gutter Services, Siding, Storm Damage & Insurance Claims"
  [new-albany]="Premium Residential Roofing, Gutter Systems"
  [pickerington]="Gutter Installation, Storm Damage, Hail Damage & Insurance Claims"
  [powell]="Roof Inspection, Gutter Installation, Storm Damage & Metal Roofing"
  [reynoldsburg]="Commercial Roofing, Gutter Installation, Storm Damage & Metal Roofing"
  [upper-arlington]="Roof Inspection, Gutter Services, Hail Damage & Insurance Claims"
  [westerville]="Commercial Roofing, Hail Damage, Insurance Claims & Attic Ventilation"
  [worthington]="Gutter Installation, Gutter Guards, Storm Damage & Commercial Roofing"
)

declare -A EXPECTED_DESC_KEY=(
  [columbus]="a Columbus, OH roofing contractor at 615 Hilliard Rome Rd"
  [delaware]="serves Delaware, OH with owner-led roof repair, replacement, storm"
  [dublin]="serves Dublin, OH from our Columbus HQ with owner-led roof repair, replacement, commercial roofing"
  [gahanna]="serves Gahanna, OH from our Columbus HQ with owner-led roof repair, commercial roofing"
  [grove-city]="serves Grove City, OH from our Columbus HQ with owner-led roof repair, replacement, gutter installation, gutter guards"
  [hilliard]="right by Hilliard at 615 Hilliard Rome Rd"
  [new-albany]="serves New Albany, OH from our Columbus HQ with owner-led residential roof replacement, premium shingles"
  [pickerington]="serves Pickerington, OH from our Columbus HQ with owner-led roof repair, replacement, gutter installation, storm damage"
  [powell]="serves Powell, OH from our Columbus HQ with owner-led roof repair, replacement, roof inspections"
  [reynoldsburg]="serves Reynoldsburg, OH from our Columbus HQ with owner-led roof repair, replacement, commercial roofing"
  [upper-arlington]="serves Upper Arlington, OH from our Columbus HQ with owner-led roof repair, inspections, gutter services, hail damage"
  [westerville]="serves Westerville, OH from our Columbus HQ with owner-led roof repair, replacement, commercial roofing, hail damage"
  [worthington]="serves Worthington, OH from our Columbus HQ with owner-led roof repair, replacement, gutter installation, gutter guards"
)

FAIL=0
PASS=0
declare -a ALL_DESCS=()

for slug in "${PAGES[@]}"; do
  f="dist/locations/$slug/index.html"
  if [[ ! -f "$f" ]]; then
    echo "FAIL [$slug]: missing dist file $f"; FAIL=$((FAIL+1)); continue
  fi

  head_block=$(sed -n '/<head>/,/<\/head>/p' "$f")

  # 1. Superlative checks (full doc)
  for bad in "BEST Roofer" "most trusted" "highest-rated" "top-rated"; do
    if grep -q "$bad" "$f"; then
      echo "FAIL [$slug]: contains superlative '$bad'"; FAIL=$((FAIL+1)); continue 2
    fi
  done
  # "#1" check — allow hex colors like #1f; look only in head metadata
  if echo "$head_block" | grep -qE '#1[^0-9a-fA-F]'; then
    echo "FAIL [$slug]: contains '#1' superlative in head"; FAIL=$((FAIL+1)); continue
  fi

  # 2. Helmet <title> present
  if ! grep -q 'data-rh="true"' "$f" || ! grep -q '<title' "$f"; then
    echo "FAIL [$slug]: missing helmet title"; FAIL=$((FAIL+1)); continue
  fi

  # 3. Helmet description tag present and contains distinctive snippet
  if ! grep -q 'data-rh="true" name="description"' "$f"; then
    echo "FAIL [$slug]: missing helmet description"; FAIL=$((FAIL+1)); continue
  fi
  desc_key="${EXPECTED_DESC_KEY[$slug]}"
  if ! grep -qF "$desc_key" "$f"; then
    echo "FAIL [$slug]: description missing approved snippet: $desc_key"; FAIL=$((FAIL+1)); continue
  fi

  # 4. H1 contains approved phrasing — HTML-escaped & becomes &amp;
  h1_expected="${EXPECTED_H1[$slug]//&/&amp;}"
  if ! grep -qF "$h1_expected" "$f"; then
    echo "FAIL [$slug]: H1 missing: $h1_expected"; FAIL=$((FAIL+1)); continue
  fi

  # 5. H2 contains approved secondary-services phrasing
  h2_expected="${EXPECTED_H2_KEY[$slug]//&/&amp;}"
  if ! grep -qF "$h2_expected" "$f"; then
    echo "FAIL [$slug]: H2 missing snippet: $h2_expected"; FAIL=$((FAIL+1)); continue
  fi

  # Collect description for uniqueness check
  desc=$(grep -oE 'data-rh="true" name="description" content="[^"]*"' "$f" | head -1)
  ALL_DESCS+=("$desc")

  echo "PASS [$slug]"
  PASS=$((PASS+1))
done

# 6. Uniqueness
unique_count=$(printf '%s\n' "${ALL_DESCS[@]}" | sort -u | wc -l)
total_count=${#ALL_DESCS[@]}
if [[ "$unique_count" -ne "$total_count" ]]; then
  echo "FAIL: descriptions not unique ($unique_count unique out of $total_count)"
  FAIL=$((FAIL+1))
fi

echo ""
echo "Phase 4 verification: $PASS passed, $FAIL failed"
[[ $FAIL -eq 0 ]] || exit 1
echo "ALL 13 LOCATION PAGES VERIFIED"
