import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, MapPin, User, Clock, Phone, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import { getPostBySlug, formatPostDate } from '../data/blogPosts';

const SITE_URL = 'https://www.dteroofingllc.com';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <SEO
          title="Post Not Found | DTE Roofing Blog"
          description="The blog post you're looking for doesn't exist."
        />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-3xl font-bold text-charcoal-900 mb-4">Post Not Found</h1>
          <p className="text-charcoal-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-all font-semibold inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${post.title} | DTE Roofing Blog`}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        canonical={pageUrl}
        ogImage={post.image}
      />
      <SchemaMarkup
        type="blog"
        faqs={post.faqs}
        pageTitle={post.title}
        pageDescription={post.metaDescription}
        pageUrl={pageUrl}
        blog={{
          headline: post.headline,
          description: post.metaDescription,
          datePublished: post.published_at,
          dateModified: post.published_at,
          image: post.image,
          url: pageUrl,
        }}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-gray-500" aria-hidden="true" />
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="h-3 w-3 text-gray-500" aria-hidden="true" />
              <span className="text-gray-300 truncate" aria-current="page">{post.title}</span>
            </nav>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-white text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatPostDate(post.published_at)}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readingMinutes} min read
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {post.city}, {post.state}
              </span>
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                DTE Roofing Team
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 lg:p-12">
              <div className="article-content">
                {post.content()}

                {post.faqs.length > 0 && (
                  <section aria-labelledby="post-faq-heading" className="post-faq">
                    <h2 id="post-faq-heading">FAQ</h2>
                    {post.faqs.map((faq) => (
                      <div key={faq.question} className="post-faq-item">
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                      </div>
                    ))}
                  </section>
                )}
              </div>

              {/* Inline CTA Box */}
              <div className="my-12 p-8 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border-l-4 border-primary-700">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">
                  📞 Need a Professional Opinion?
                </h3>
                <p className="text-charcoal-700 mb-4">
                  Not sure if your roof needs attention? DTE Roofing offers <strong>FREE inspections</strong> for homeowners in {post.city} and throughout Central Ohio.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Free Inspection
                  </Link>
                  <Link
                    to="/get-a-quote-consultation"
                    className="inline-flex items-center bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold border-2 border-primary-700 hover:bg-primary-50 transition-colors"
                  >
                    Get Instant Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-12 p-8 md:p-10 bg-gradient-to-br from-charcoal-900 to-charcoal-800 rounded-2xl text-white">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Protect Your {post.city} Home Today
                </h3>
                <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                  DTE Roofing has been serving Central Ohio homeowners with honest, reliable roofing services. Get your FREE inspection and estimate today – no obligation, no pressure.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 transition-colors shadow-lg"
                  >
                    Get Your Free Inspection
                  </Link>
                  <Link
                    to="/get-a-quote-consultation"
                    className="inline-flex items-center bg-white text-charcoal-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Try Our Instant Quote Tool
                  </Link>
                </div>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </article>

    </div>
  );
}
