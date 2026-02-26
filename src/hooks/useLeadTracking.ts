import { useEffect, useRef } from 'react';

interface TrackingData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string;
  landingPage: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenResolution: string;
  userAgent: string;
  sessionId: string;
  formStartedAt: string;
}

function getOrCreateSessionId(): string {
  const key = 'dte_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function getLandingPage(): string {
  const key = 'dte_landing_page';
  let page = sessionStorage.getItem(key);
  if (!page) {
    page = window.location.pathname;
    sessionStorage.setItem(key, page);
  }
  return page;
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function useLeadTracking(): TrackingData {
  const dataRef = useRef<TrackingData | null>(null);

  if (!dataRef.current) {
    const params = new URLSearchParams(window.location.search);
    dataRef.current = {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content'),
      referrer: document.referrer,
      landingPage: getLandingPage(),
      deviceType: getDeviceType(),
      screenResolution: `${screen.width}x${screen.height}`,
      userAgent: navigator.userAgent,
      sessionId: getOrCreateSessionId(),
      formStartedAt: new Date().toISOString(),
    };
  }

  // Store landing page on first load
  useEffect(() => {
    getLandingPage();
  }, []);

  return dataRef.current;
}
