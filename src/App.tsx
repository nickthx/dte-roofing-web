import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RoofleSlideout from './components/RoofleSlideout';

// Route components are lazy-loaded so each page ships as its own chunk instead of
// bundling all 35 routes into one initial download. The prerender step
// (src/entry-server.tsx) resolves these via renderToPipeableStream's onAllReady,
// so every route still emits fully-rendered HTML + per-route Helmet meta. The
// matching chunk is preloaded per route by scripts/prerender.mjs, so splitting
// does not introduce a hydration request waterfall.
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const RoofInstallation = lazy(() => import('./pages/services/RoofInstallation'));
const RoofRepair = lazy(() => import('./pages/services/RoofRepair'));
const RoofReplacement = lazy(() => import('./pages/services/RoofReplacement'));
const RoofInspection = lazy(() => import('./pages/services/RoofInspection'));
const Gutters = lazy(() => import('./pages/services/Gutters'));
const EmergencyServices = lazy(() => import('./pages/services/EmergencyServices'));
const StormDamage = lazy(() => import('./pages/services/StormDamage'));
const PreventativeMaintenance = lazy(() => import('./pages/services/PreventativeMaintenance'));
const Siding = lazy(() => import('./pages/services/Siding'));
const CommercialRoofing = lazy(() => import('./pages/services/CommercialRoofing'));
const Locations = lazy(() => import('./pages/Locations'));
const Columbus = lazy(() => import('./pages/locations/Columbus'));
const Hilliard = lazy(() => import('./pages/locations/Hilliard'));
const Dublin = lazy(() => import('./pages/locations/Dublin'));
const NewAlbany = lazy(() => import('./pages/locations/NewAlbany'));
const UpperArlington = lazy(() => import('./pages/locations/UpperArlington'));
const Westerville = lazy(() => import('./pages/locations/Westerville'));
const Gahanna = lazy(() => import('./pages/locations/Gahanna'));
const Reynoldsburg = lazy(() => import('./pages/locations/Reynoldsburg'));
const GroveCity = lazy(() => import('./pages/locations/GroveCity'));
const Pickerington = lazy(() => import('./pages/locations/Pickerington'));
const Worthington = lazy(() => import('./pages/locations/Worthington'));
const Delaware = lazy(() => import('./pages/locations/Delaware'));
const Powell = lazy(() => import('./pages/locations/Powell'));
const InstantQuote = lazy(() => import('./pages/InstantQuote'));
const Financing = lazy(() => import('./pages/Financing'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader(): JSX.Element {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-700" />
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <RoofleSlideout />
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/roof-installation" element={<RoofInstallation />} />
              <Route path="/services/roof-repair" element={<RoofRepair />} />
              <Route path="/services/roof-replacement" element={<RoofReplacement />} />
              <Route path="/services/roof-inspection" element={<RoofInspection />} />
              <Route path="/services/gutters" element={<Gutters />} />
              <Route path="/services/emergency-services" element={<EmergencyServices />} />
              <Route path="/services/storm-damage" element={<StormDamage />} />
              <Route path="/services/preventative-maintenance" element={<PreventativeMaintenance />} />
              <Route path="/services/siding" element={<Siding />} />
              <Route path="/services/commercial-roofing" element={<CommercialRoofing />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/columbus" element={<Columbus />} />
              <Route path="/locations/hilliard" element={<Hilliard />} />
              <Route path="/locations/dublin" element={<Dublin />} />
              <Route path="/locations/new-albany" element={<NewAlbany />} />
              <Route path="/locations/upper-arlington" element={<UpperArlington />} />
              <Route path="/locations/westerville" element={<Westerville />} />
              <Route path="/locations/gahanna" element={<Gahanna />} />
              <Route path="/locations/reynoldsburg" element={<Reynoldsburg />} />
              <Route path="/locations/grove-city" element={<GroveCity />} />
              <Route path="/locations/pickerington" element={<Pickerington />} />
              <Route path="/locations/worthington" element={<Worthington />} />
              <Route path="/locations/delaware" element={<Delaware />} />
              <Route path="/locations/powell" element={<Powell />} />
              <Route path="/get-a-quote-consultation" element={<InstantQuote />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
