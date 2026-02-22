import { Link } from 'react-router-dom';
import { Shield, Award, Star } from 'lucide-react';
import { useReviewData } from '../hooks/useReviewData';

export default function Footer() {
  const { reviewData } = useReviewData();
  return (
    <footer className="bg-charcoal-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div>
            <img
              src="/DTE-Roofing-Logo-two-Men.png"
              alt="DTE Roofing - Professional Roofing Services in Columbus OH"
              className="h-12 w-auto mb-4 brightness-0 invert"
              loading="lazy"
              width="100"
              height="48"
            />
            <p className="text-gray-400">
              Locally owned and operated by Donovan & Mitchell. Premium craftsmanship. Honest pricing.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services/roof-installation" className="hover:text-white transition-colors">Roof Installation</Link></li>
              <li><Link to="/services/roof-repair" className="hover:text-white transition-colors">Roof Repair</Link></li>
              <li><Link to="/services/roof-inspection" className="hover:text-white transition-colors">Inspections</Link></li>
              <li><Link to="/services/emergency-services" className="hover:text-white transition-colors">Emergency Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Areas We Serve</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/locations/hilliard" className="hover:text-white transition-colors">Hilliard</Link></li>
              <li><Link to="/locations/dublin" className="hover:text-white transition-colors">Dublin</Link></li>
              <li><Link to="/locations/columbus" className="hover:text-white transition-colors">Columbus</Link></li>
              <li><Link to="/locations/westerville" className="hover:text-white transition-colors">Westerville</Link></li>
              <li><Link to="/locations/powell" className="hover:text-white transition-colors">Powell</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">All Service Areas →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="tel:6149716028" className="hover:text-white transition-colors">
                  Call/Text: 614-971-6028
                </a>
              </li>
              <li>
                <a href="mailto:experience@dteroofingllc.com" className="hover:text-white transition-colors">
                  experience@dteroofingllc.com
                </a>
              </li>
              <li>615 Hilliard Rome Rd<br />Columbus, OH 43228</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3 text-gray-400">
              <Shield className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-white text-sm mb-1">Licensed & Insured</h5>
                <p className="text-sm">Fully licensed and insured in Ohio</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-gray-400">
              <Award className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-white text-sm mb-1">GAF Certified</h5>
                <p className="text-sm">Certified by leading manufacturers</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-gray-400">
              <a
                href="https://www.google.com/maps/place/DTE+Roofing+LLC/@39.9637636,-83.1476323,17z/data=!3m1!4b1!4m6!3m5!1s0x883897c3548f20bf:0xdd1da18d4d7ccf43!8m2!3d39.9637636!4d-83.1476323!16s%2Fg%2F11vrcm8sdz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <h5 className="font-bold text-white text-sm mb-1">Five-Star Reputation</h5>
                  <p className="text-sm">{reviewData?.totalReviews || 92} verified 5-star reviews and counting</p>
                </div>
              </a>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DTE Roofing. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
