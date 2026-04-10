import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowLeft, MapPin, User, Clock, Phone } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  tags: string[];
  city: string;
  state: string;
  published_at: string;
  created_at: string;
  status: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Estimate reading time
  const getReadingTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const pageTitle = post ? `${post.title} | DTE Roofing Blog` : 'DTE Roofing Blog | Central Ohio Roofing Tips';
  const pageDescription = post ? post.excerpt : 'Roofing tips, maintenance guides, and expert advice for Central Ohio homeowners from DTE Roofing.';
  const pageCanonical = post ? `https://www.dteroofingllc.com/blog/${post.slug}` : undefined;
  const pageKeywords = post ? (post.tags?.join(', ') || 'roofing, Columbus, Ohio') : 'roofing blog, Columbus, Ohio, roof tips';

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <SEO
          title={pageTitle}
          description={pageDescription}
          keywords={pageKeywords}
          canonical={pageCanonical}
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <SEO
          title={pageTitle}
          description={pageDescription}
          keywords={pageKeywords}
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${post.title} | DTE Roofing Blog`}
        description={post.excerpt}
        keywords={post.tags?.join(', ') || 'roofing, Columbus, Ohio'}
        canonical={`https://www.dteroofingllc.com/blog/${post.slug}`}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
            </Link>
            
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
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {getReadingTime(post.content_html)}
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
              
              {/* Article Content with Custom Styling */}
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />

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

      {/* Article Styling */}
      <style>{`
        .article-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
        }

        .article-content h1 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .article-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid #dc2626;
          line-height: 1.3;
        }

        .article-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          color: #4b5563;
        }

        .article-content ul,
        .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .article-content ul {
          list-style-type: disc;
        }

        .article-content ol {
          list-style-type: decimal;
        }

        .article-content li {
          margin-bottom: 0.75rem;
          color: #4b5563;
          padding-left: 0.5rem;
        }

        .article-content li::marker {
          color: #dc2626;
          font-weight: 600;
        }

        .article-content a {
          color: #dc2626;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .article-content a:hover {
          color: #b91c1c;
        }

        .article-content strong {
          font-weight: 600;
          color: #111827;
        }

        .article-content blockquote {
          margin: 2rem 0;
          padding: 1.5rem 2rem;
          background: #f9fafb;
          border-left: 4px solid #dc2626;
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
          color: #4b5563;
        }

        .article-content img {
          border-radius: 0.75rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* First paragraph after h2 - make it slightly larger */
        .article-content h2 + p {
          font-size: 1.175rem;
          color: #374151;
        }

        /* Remove top margin from first element */
        .article-content > *:first-child {
          margin-top: 0;
        }

        /* Add extra space before major sections */
        .article-content h2:not(:first-child) {
          margin-top: 3.5rem;
        }
      `}</style>
    </div>
  );
}