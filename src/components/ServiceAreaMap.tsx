import { useEffect, useRef, useCallback } from 'react';
import { HQ_GEO } from '../data/business';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface CityMarker {
  name: string;
  slug: string;
  lat: number;
  lng: number;
}

const CITIES: CityMarker[] = [
  { name: 'Hilliard',        slug: 'hilliard',        lat: 40.0334, lng: -83.1585 },
  { name: 'Columbus',        slug: 'columbus',        lat: 39.9612, lng: -82.9988 },
  { name: 'Dublin',          slug: 'dublin',          lat: 40.0992, lng: -83.1141 },
  { name: 'Powell',          slug: 'powell',          lat: 40.1578, lng: -83.0752 },
  { name: 'Delaware',        slug: 'delaware',        lat: 40.2987, lng: -83.0680 },
  { name: 'Westerville',     slug: 'westerville',     lat: 40.1262, lng: -82.9291 },
  { name: 'Worthington',     slug: 'worthington',     lat: 40.0931, lng: -83.0188 },
  { name: 'New Albany',      slug: 'new-albany',      lat: 40.0812, lng: -82.8085 },
  { name: 'Upper Arlington', slug: 'upper-arlington', lat: 39.9945, lng: -83.0624 },
  { name: 'Gahanna',         slug: 'gahanna',         lat: 40.0192, lng: -82.8793 },
  { name: 'Reynoldsburg',    slug: 'reynoldsburg',    lat: 39.9573, lng: -82.8121 },
  { name: 'Grove City',      slug: 'grove-city',      lat: 39.8812, lng: -83.0930 },
  { name: 'Pickerington',    slug: 'pickerington',    lat: 39.8842, lng: -82.7535 },
];

let mapsLoadPromise: Promise<void> | null = null;
const MAPS_CALLBACK = '__dteServiceAreaMapInit';
const MAPS_POLL_INTERVAL_MS = 100;
const MAPS_POLL_TIMEOUT_MS = 10000;

function isMapsReady(): boolean {
  return typeof window !== 'undefined' && !!window.google?.maps?.marker?.AdvancedMarkerElement;
}

function loadGoogleMaps(): Promise<void> {
  if (!API_KEY) {
    return Promise.reject(new Error('VITE_GOOGLE_MAPS_API_KEY is not set — skipping Google Maps load'));
  }
  if (isMapsReady()) return Promise.resolve();
  if (mapsLoadPromise) return mapsLoadPromise;

  mapsLoadPromise = new Promise<void>((resolve, reject) => {
    (window as unknown as Record<string, unknown>)[MAPS_CALLBACK] = () => {
      if (isMapsReady()) {
        resolve();
        return;
      }
      if (window.google?.maps?.importLibrary) {
        window.google.maps.importLibrary('marker').then(() => resolve(), reject);
        return;
      }
      resolve();
    };

    // A Maps script added elsewhere was not created with our callback, so poll
    // for readiness instead of trusting its load event (fires too early under
    // loading=async, and never fires again if the script already loaded).
    const existing = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existing) {
      const startedAt = Date.now();
      const timer = window.setInterval(() => {
        if (isMapsReady()) {
          window.clearInterval(timer);
          resolve();
        } else if (Date.now() - startedAt >= MAPS_POLL_TIMEOUT_MS) {
          window.clearInterval(timer);
          mapsLoadPromise = null;
          reject(new Error('Timed out waiting for Google Maps'));
        }
      }, MAPS_POLL_INTERVAL_MS);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&loading=async&libraries=marker&callback=${MAPS_CALLBACK}`;
    script.async = true;
    script.onerror = () => {
      script.remove();
      mapsLoadPromise = null;
      reject(new Error('Failed to load Google Maps'));
    };
    document.head.appendChild(script);
  });

  return mapsLoadPromise;
}

export default function ServiceAreaMap(): JSX.Element | null {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 40.05, lng: -82.95 },
      zoom: 10,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      // Advanced markers require a Map ID. DEMO_MAP_ID is Google's demo ID.
      // Hiding POIs/transit or tinting water now needs a cloud-styled Map ID.
      mapId: 'DEMO_MAP_ID',
    });
    mapInstance.current = map;

    const bounds = new google.maps.LatLngBounds();
    let activeInfoWindow: google.maps.InfoWindow | null = null;

    CITIES.forEach((city) => {
      const position = { lat: city.lat, lng: city.lng };
      bounds.extend(position);

      const pin = new google.maps.marker.PinElement({
        background: '#b91c1c',
        borderColor: '#ffffff',
        glyphColor: '#ffffff',
        scale: 0.8,
      });

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position,
        title: city.name,
        content: pin.element,
        gmpClickable: true,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding:4px 8px;font-family:system-ui,sans-serif;">
            <strong style="font-size:14px;color:#3d3d3d;">${city.name}</strong>
            <a href="/locations/${city.slug}" style="font-size:12px;color:#b91c1c;text-decoration:none;font-weight:500;">
              View Services →
            </a>
          </div>
        `,
      });

      marker.addEventListener('gmp-click', () => {
        if (activeInfoWindow) activeInfoWindow.close();
        infoWindow.open({ anchor: marker, map });
        activeInfoWindow = infoWindow;
      });
    });

    const hqPosition = { lat: HQ_GEO.lat, lng: HQ_GEO.lng };
    bounds.extend(hqPosition);

    const hqPin = new google.maps.marker.PinElement({
      background: '#991b1b',
      borderColor: '#ffffff',
      glyphText: '★',
      glyphColor: '#ffffff',
      scale: 1.2,
    });

    const hqMarker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: hqPosition,
      title: 'DTE Roofing — Headquarters',
      content: hqPin.element,
      gmpClickable: true,
      zIndex: 1000,
    });

    const hqInfoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding:4px 8px;font-family:system-ui,sans-serif;">
          <strong style="font-size:14px;color:#3d3d3d;">DTE Roofing</strong>
          <div style="font-size:11px;color:#991b1b;font-weight:600;">★ Headquarters</div>
          <div style="font-size:12px;color:#3d3d3d;">615 Hilliard Rome Rd, Columbus, OH 43228</div>
          <a href="/contact" style="font-size:12px;color:#b91c1c;text-decoration:none;font-weight:500;">
            Contact Us →
          </a>
        </div>
      `,
    });

    hqMarker.addEventListener('gmp-click', () => {
      if (activeInfoWindow) activeInfoWindow.close();
      hqInfoWindow.open({ anchor: hqMarker, map });
      activeInfoWindow = hqInfoWindow;
    });

    map.fitBounds(bounds, { top: 30, right: 30, bottom: 30, left: 30 });
  }, []);

  useEffect(() => {
    loadGoogleMaps().then(initMap).catch(console.error);
  }, [initMap]);

  if (!API_KEY) return null;

  return (
    <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
      <div ref={mapRef} className="w-full" style={{ height: '450px' }} />
    </div>
  );
}
