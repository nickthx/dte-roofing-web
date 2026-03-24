import { useEffect, useRef, useCallback } from 'react';

const API_KEY = 'AIzaSyC1iVbN_Un4Dr30YKacyclT-cDZBMHOS4g';

interface CityMarker {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
}

const CITIES: CityMarker[] = [
  { name: 'Hilliard',        slug: 'hilliard',        lat: 40.0334, lng: -83.1585, isHQ: true },
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

function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve();
      return;
    }
    const existing = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });
}

export default function ServiceAreaMap(): JSX.Element {
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
      styles: [
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#e2e2e2' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{ color: '#dbeafe' }],
        },
      ],
    });
    mapInstance.current = map;

    const bounds = new google.maps.LatLngBounds();
    let activeInfoWindow: google.maps.InfoWindow | null = null;

    CITIES.forEach((city) => {
      const position = { lat: city.lat, lng: city.lng };
      bounds.extend(position);

      const marker = new google.maps.Marker({
        position,
        map,
        title: city.isHQ ? `${city.name} — Headquarters` : city.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: city.isHQ ? 10 : 7,
          fillColor: city.isHQ ? '#991b1b' : '#b91c1c',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        label: city.isHQ
          ? { text: '★', color: '#ffffff', fontSize: '12px', fontWeight: 'bold' }
          : undefined,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding:4px 8px;font-family:system-ui,sans-serif;">
            <strong style="font-size:14px;color:#3d3d3d;">${city.name}</strong>
            ${city.isHQ ? '<div style="font-size:11px;color:#991b1b;font-weight:600;">★ Headquarters</div>' : ''}
            <a href="/locations/${city.slug}" style="font-size:12px;color:#b91c1c;text-decoration:none;font-weight:500;">
              View Services →
            </a>
          </div>
        `,
      });

      marker.addListener('click', () => {
        if (activeInfoWindow) activeInfoWindow.close();
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow;
      });
    });

    map.fitBounds(bounds, { top: 30, right: 30, bottom: 30, left: 30 });
  }, []);

  useEffect(() => {
    loadGoogleMaps().then(initMap).catch(console.error);
  }, [initMap]);

  return (
    <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
      <div ref={mapRef} className="w-full" style={{ height: '450px' }} />
    </div>
  );
}
