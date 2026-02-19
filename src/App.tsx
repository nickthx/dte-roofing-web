import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import RoofInstallation from './pages/services/RoofInstallation';
import RoofRepair from './pages/services/RoofRepair';
import RoofReplacement from './pages/services/RoofReplacement';
import RoofInspection from './pages/services/RoofInspection';
import GutterServices from './pages/services/GutterServices';
import Gutters from './pages/services/Gutters';
import EmergencyServices from './pages/services/EmergencyServices';
import StormDamage from './pages/services/StormDamage';
import RoofMaintenance from './pages/services/RoofMaintenance';
import PreventativeMaintenance from './pages/services/PreventativeMaintenance';
import Siding from './pages/services/Siding';
import CommercialRoofing from './pages/services/CommercialRoofing';
import Locations from './pages/Locations';
import Columbus from './pages/locations/Columbus';
import Hilliard from './pages/locations/Hilliard';
import Dublin from './pages/locations/Dublin';
import NewAlbany from './pages/locations/NewAlbany';
import UpperArlington from './pages/locations/UpperArlington';
import Westerville from './pages/locations/Westerville';
import Gahanna from './pages/locations/Gahanna';
import Reynoldsburg from './pages/locations/Reynoldsburg';
import GroveCity from './pages/locations/GroveCity';
import Pickerington from './pages/locations/Pickerington';
import Worthington from './pages/locations/Worthington';
import Delaware from './pages/locations/Delaware';
import Powell from './pages/locations/Powell';
import InstantQuote from './pages/InstantQuote';
import Financing from './pages/Financing';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Navigate to="/services" replace />} />
            <Route path="/services/roof-installation" element={<RoofInstallation />} />
            <Route path="/services/roof-repair" element={<RoofRepair />} />
            <Route path="/services/roof-replacement" element={<RoofReplacement />} />
            <Route path="/services/roof-inspection" element={<RoofInspection />} />
            <Route path="/services/gutter-services" element={<GutterServices />} />
            <Route path="/services/gutters" element={<Gutters />} />
            <Route path="/services/emergency-services" element={<EmergencyServices />} />
            <Route path="/services/storm-damage" element={<StormDamage />} />
            <Route path="/services/roof-maintenance" element={<RoofMaintenance />} />
            <Route path="/services/preventative-maintenance" element={<PreventativeMaintenance />} />
            <Route path="/services/siding" element={<Siding />} />
            <Route path="/services/commercial-roofing" element={<CommercialRoofing />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/faqs" element={<Navigate to="/faq" replace />} />
            <Route path="/careers" element={<Navigate to="/contact" replace />} />
            <Route path="/book-a-consultation" element={<Navigate to="/contact" replace />} />
            <Route path="/cart" element={<Navigate to="/contact" replace />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
