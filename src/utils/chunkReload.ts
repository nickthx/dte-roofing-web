const RELOAD_KEY = 'dte:chunk-reload-at';
const RELOAD_WINDOW_MS = 10000;

function readLastReload(): number {
  try {
    const value = Number(window.sessionStorage.getItem(RELOAD_KEY));
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function markReload(): boolean {
  try {
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    return true;
  } catch {
    return false;
  }
}

// A stale-hash 404 after a deploy or a transient 502 on a route chunk is usually
// fixed by one reload. A second failure inside the window falls through to
// RouteErrorBoundary instead of looping.
export function installChunkReloadHandler(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('vite:preloadError', (event) => {
    if (Date.now() - readLastReload() < RELOAD_WINDOW_MS) {
      console.error('Chunk failed to load after reload; showing fallback:', event.payload);
      return;
    }
    if (!markReload()) return;
    event.preventDefault();
    window.location.reload();
  });
}
