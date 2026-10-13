import { Link } from 'react-router-dom';
import Picture from './Picture';
import { getProjectsByIds } from '../data/projects';

interface RecentWorkProps {
  projectIds: number[];
  heading: string;
  intro?: string;
  className?: string;
}

// Pure markup (no state/effects/lazy) so it prerenders into static HTML under streaming SSR.
export default function RecentWork({ projectIds, heading, intro, className }: RecentWorkProps): JSX.Element {
  const items = getProjectsByIds(projectIds);
  const headingId = 'recent-work-' + heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <section aria-labelledby={headingId} className={className}>
      <h2 id={headingId} className="text-3xl font-bold text-charcoal-900 mb-6">{heading}</h2>
      {intro && <p className="text-lg text-charcoal-600 mb-8">{intro}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((project) => (
          <figure key={project.id}>
            <div className="aspect-video overflow-hidden rounded-xl shadow-md">
              <Picture
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              />
            </div>
            <figcaption className="mt-2 text-sm text-charcoal-600">{project.title} — {project.location}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6">
        <Link to="/gallery" className="inline-flex items-center text-primary-700 hover:text-primary-800 font-semibold">
          See more completed projects
        </Link>
      </p>
    </section>
  );
}
