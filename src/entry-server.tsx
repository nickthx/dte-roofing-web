import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App.tsx';

// Renders a route to a complete HTML string for the prerender step.
//
// We use renderToPipeableStream and resolve on `onAllReady` (not `onShellReady`)
// so every lazy route chunk AND its react-helmet-async head tags are fully
// resolved before we read them. This is what lets route-level code splitting
// (React.lazy in App.tsx) coexist with prerendering: plain renderToString would
// emit Suspense fallbacks instead of the real page + meta.
export function render(url: string): Promise<{ html: string; helmet: HelmetServerState }> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    stream.setEncoding('utf8');
    let html = '';
    stream.on('data', (chunk: string) => {
      html += chunk;
    });
    stream.on('end', () => {
      resolve({ html, helmet: helmetContext.helmet as HelmetServerState });
    });
    stream.on('error', reject);

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          pipe(stream);
        },
        onError(error) {
          reject(error);
        },
      }
    );
  });
}
