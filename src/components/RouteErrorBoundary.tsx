import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPrerenderedMain } from '../utils/prerenderSnapshot';

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

interface RouteErrorBoundaryInnerProps extends RouteErrorBoundaryProps {
  pathname: string;
}

interface BoundaryState {
  hasError: boolean;
}

class RouteErrorBoundaryInner extends Component<RouteErrorBoundaryInnerProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Route failed to render:', error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const snapshot = getPrerenderedMain(this.props.pathname);
    if (snapshot !== null) {
      return (
        <>
          <div role="status" className="bg-charcoal-900 text-white px-4 py-3 text-center text-sm sm:text-base">
            Part of this page didn&apos;t load.
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="ml-1 underline font-semibold hover:text-primary-200"
            >
              Reload
            </button>
          </div>
          {/* Our own prerendered markup captured from #root before hydration, not user input. */}
          <div dangerouslySetInnerHTML={{ __html: snapshot }} />
        </>
      );
    }

    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-white px-4 py-16">
        <div className="max-w-xl text-center">
          <h2 className="text-3xl font-bold text-charcoal-900 mb-4">This page didn&apos;t finish loading</h2>
          <p className="text-lg text-charcoal-600 mb-8">
            A connection hiccup stopped part of this page from loading. Reloading usually fixes it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Reload page
            </button>
            <Link
              to="/"
              className="border-2 border-charcoal-900 text-charcoal-900 px-8 py-4 rounded-lg hover:bg-charcoal-900 hover:text-white transition-all font-semibold text-lg inline-flex items-center justify-center"
            >
              Go to homepage
            </Link>
          </div>
          <p className="mt-8 text-charcoal-600">
            Prefer to talk? Call us at{' '}
            <a href="tel:6149716028" className="text-primary-700 font-semibold hover:text-primary-800">
              614-971-6028
            </a>
          </p>
        </div>
      </section>
    );
  }
}

export default function RouteErrorBoundary({ children }: RouteErrorBoundaryProps): JSX.Element {
  const { pathname } = useLocation();
  return <RouteErrorBoundaryInner key={pathname} pathname={pathname}>{children}</RouteErrorBoundaryInner>;
}
