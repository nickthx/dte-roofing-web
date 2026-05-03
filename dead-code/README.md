# dead-code/

Files in this folder are no longer routed or imported anywhere. Kept for git-historical reference only. Vite/TypeScript do not compile this directory.

To restore a file: move it back to its original `src/` location and re-import in `App.tsx`.

## Inventory

| File | Original location | Removed | Reason |
|------|-------------------|---------|--------|
| `GutterServices.tsx` | `src/pages/services/GutterServices.tsx` | 2026-05-03 | Superseded by `Gutters.tsx`; never routed in `routes.config.mjs` or `App.tsx` |
| `RoofMaintenance.tsx` | `src/pages/services/RoofMaintenance.tsx` | 2026-05-03 | Superseded by `PreventativeMaintenance.tsx`; never routed |
