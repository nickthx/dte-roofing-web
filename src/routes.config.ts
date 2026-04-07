// TypeScript re-export of the canonical routes.config.mjs.
// Single source of truth lives in routes.config.mjs so Node scripts can import
// it directly without a TS loader.

export interface RouteConfig {
  path: string;
  source: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: string;
  prerender: boolean;
}

// @ts-expect-error - importing .mjs sibling; types declared above
export { ROUTES, PRERENDER_ROUTES } from './routes.config.mjs';
