import { CheckCircle, AlertCircle, Phone } from 'lucide-react';

interface StepResultProps {
  status: 'success' | 'error';
  onRetry: () => void;
}

export default function StepResult({ status, onRetry }: StepResultProps) {
  if (status === 'success') {
    return (
      <div className="text-center py-2">
        <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-charcoal-900 mb-2">Thank You!</h3>
        <p className="text-charcoal-700 text-sm mb-4">
          We've received your request and will contact you within 24 hours to schedule your free inspection.
        </p>
        <div className="bg-gray-50 p-3 rounded-lg mb-4 text-left">
          <p className="text-xs text-charcoal-700 font-semibold mb-2">Next Steps:</p>
          <ol className="text-xs text-charcoal-600 space-y-1">
            <li>1. We'll review your request</li>
            <li>2. Call to schedule your free inspection</li>
            <li>3. Meet you at your property</li>
            <li>4. Provide honest recommendations</li>
          </ol>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-charcoal-600 mb-1">Need immediate assistance?</p>
          <a href="tel:6149716028" className="inline-flex items-center gap-1.5 text-primary-700 hover:text-primary-800 font-bold text-sm">
            <Phone className="w-4 h-4" />
            Call 614-971-6028
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-2">
      <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-7 h-7 text-red-600" />
      </div>
      <h3 className="text-xl font-bold text-charcoal-900 mb-2">Something Went Wrong</h3>
      <p className="text-charcoal-700 text-sm mb-4">
        We couldn't submit your request. Please try again or call us directly.
      </p>
      <div className="space-y-3">
        <button
          type="button"
          onClick={onRetry}
          className="w-full bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-bold text-base"
        >
          Try Again
        </button>
        <a
          href="tel:6149716028"
          className="w-full flex items-center justify-center gap-2 text-primary-700 hover:text-primary-800 font-semibold text-sm transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call 614-971-6028
        </a>
      </div>
    </div>
  );
}
