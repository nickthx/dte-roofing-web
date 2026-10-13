let capturedPath: string | null = null;
let capturedHtml: string | null = null;

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function capturePrerenderedMain(container: HTMLElement): void {
  if (typeof window === 'undefined') {
    return;
  }
  const html = container.querySelector('main')?.innerHTML;
  if (html === undefined || html.trim() === '') {
    return;
  }
  capturedHtml = html;
  capturedPath = normalizePath(window.location.pathname);
}

export function getPrerenderedMain(pathname: string): string | null {
  if (typeof window === 'undefined' || capturedHtml === null || capturedPath === null) {
    return null;
  }
  return normalizePath(pathname) === capturedPath ? capturedHtml : null;
}
