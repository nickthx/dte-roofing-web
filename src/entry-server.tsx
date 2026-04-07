import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type FilledContext } from 'react-helmet-async';
import App from './App.tsx';

export function render(url: string) {
  const helmetContext = {} as FilledContext;
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
  return { html, helmet: helmetContext.helmet };
}
