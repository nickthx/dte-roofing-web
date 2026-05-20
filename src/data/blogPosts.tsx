import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  headline: string;
  excerpt: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  city: string;
  state: string;
  published_at: string;
  created_at: string;
  status: 'published' | 'draft';
  image: string;
  readingMinutes: number;
  content: () => ReactNode;
  faqs: BlogFAQ[];
}

const signsYouNeedANewRoof: BlogPost = {
  id: 'signs-you-need-a-new-roof',
  slug: 'signs-you-need-a-new-roof',
  title: '7 Signs You Need a New Roof in Ohio',
  headline: '7 Signs You Need a New Roof in Ohio',
  excerpt:
    "Roofs almost always warn you before they fail. Seven signs Central Ohio homeowners should watch for — from curling shingles and granule loss to a sagging roofline — and which mean replacement versus repair.",
  metaDescription:
    "Not sure if it's time to replace your roof? 7 signs Ohio homeowners should watch for, from granule loss to a sagging deck. Free inspection: 614-971-6028.",
  keywords: [
    'signs you need a new roof',
    'roof replacement Columbus',
    'roof repair Columbus OH',
    'Ohio roof damage',
    'when to replace a roof',
  ],
  tags: ['Roof Inspection', 'Roof Replacement', 'Maintenance'],
  city: 'Columbus',
  state: 'OH',
  published_at: '2026-05-19',
  created_at: '2026-05-19',
  status: 'published',
  image: 'https://www.dteroofingllc.com/images/hero-roofing-professional.jpg',
  readingMinutes: 7,
  content: () => (
    <>
      <p>
        Most Columbus homeowners don't think about their roof until water shows up on the
        ceiling. By then, a problem that started small has usually had months to get worse.
        The good news: roofs almost always warn you before they fail. You just have to know
        what to look for.
      </p>
      <p>
        Central Ohio is hard on roofs. Hot, humid summers, hailstorms, high winds, and winter
        freeze-thaw cycles all wear down shingles faster than the lifespan printed on the
        package. So the signs that you need a new roof tend to show up here a few years
        earlier than they would in a milder climate.
      </p>
      <p>
        Below are the seven signs we look for on every inspection. Some mean it's time to plan
        a replacement. Others just mean it's time for a repair — and we'll tell you which is
        which, because not every warning sign is a reason to replace a whole roof.
      </p>

      <h2>How Ohio weather ages your roof faster</h2>
      <p>
        Before the list, it helps to understand <em>why</em> roofs here wear out sooner.
        Asphalt shingles expand in summer heat and contract in winter cold. In Ohio, that
        happens over and over, all year. Each cycle loosens the granules that protect the
        shingle and stresses the seals that keep water out.
      </p>
      <p>
        Add in hail that bruises shingles, wind that lifts and tears them, and ice that backs
        water up under the edges, and a roof rated for 25 years often shows real wear by year
        18 to 20. That's normal here. It's also why a yearly look matters more in Central Ohio
        than the national averages suggest.
      </p>

      <h2>The 7 signs you need a new roof</h2>

      <h3>1. Shingles that are curling, cupping, or buckling</h3>
      <p>
        Healthy shingles lie flat. When the edges turn up (curling), the centers lift
        (cupping), or the surface waves and ripples (buckling), the shingle has lost its
        flexibility and its grip on the roof.
      </p>
      <p>
        In Ohio this is usually freeze-thaw damage or simple age. A few curled shingles in one
        spot can sometimes be repaired. Curling spread across the whole roof almost always
        means the roof is at the end of its life.
      </p>
      <p>
        <strong>Urgent or monitor?</strong> Widespread curling — plan a replacement. A small
        isolated patch — get it looked at, but it may be a repair.
      </p>

      <h3>2. Granules collecting in your gutters</h3>
      <p>
        Those sand-like granules on asphalt shingles are the roof's sunscreen. They block UV
        and protect the asphalt underneath. When you find piles of them in your gutters or at
        the bottom of downspouts, your shingles are going bald.
      </p>
      <p>
        Some granule loss is normal on a new roof. Heavy, ongoing loss — especially showing
        bare black or shiny spots on the shingles — is not. In Central Ohio this often spikes
        after a hailstorm, which knocks granules loose all at once.
      </p>
      <p>
        <strong>Urgent or monitor?</strong> Heavy loss with visible bald spots — your roof is
        aging out. After a storm, it's worth a{' '}
        <Link to="/services/storm-damage">free storm damage inspection</Link> to check whether
        insurance applies.
      </p>

      <h3>3. Missing, cracked, or torn shingles</h3>
      <p>
        High winds and storms are the usual cause here. A few missing shingles after a big
        storm may be a quick repair. But if you're losing shingles regularly, or you see
        cracking across large areas, the roof has gotten brittle and the problem will keep
        coming back.
      </p>
      <p>Look especially at the edges and ridges, where wind does the most damage.</p>
      <p>
        <strong>Urgent or monitor?</strong> Active gaps that expose the underlayment — urgent,
        because water gets in fast. Recurring loss across the roof — time to replace.
      </p>

      <h3>4. Your roof is 20 years or older</h3>
      <p>
        Age alone is a sign. Most asphalt roofs in Ohio last 20 to 30 years, and architectural
        shingles a bit longer — but our climate pushes those numbers down. If your roof is
        past 20 and showing any of the other signs on this list, replacement is usually the
        smarter long-term call than pouring money into repeated repairs.
      </p>
      <p>
        If you're not sure how old your roof is, a closing document from when you bought the
        home or a past permit often has the date. (Curious how long different materials really
        last here? That's worth its own conversation —{' '}
        <Link to="/services/roof-inspection">
          we cover it during a free inspection
        </Link>
        .)
      </p>
      <p>
        <strong>Urgent or monitor?</strong> Not urgent on its own, but a 20-plus-year roof
        deserves a yearly check.
      </p>

      <h3>5. Water stains on ceilings or daylight in the attic</h3>
      <p>
        Inside signs matter as much as the ones up top. Brown or yellow rings on a ceiling,
        peeling paint near the roofline, or a musty smell in the attic all point to water
        getting in. In the attic itself, look for dark streaks on the wood, damp insulation,
        or — the clearest sign of all — daylight coming through the roof boards.
      </p>
      <p>
        Leaks rarely show up directly under the hole. Water travels along rafters before it
        drips, so the stain on your ceiling may be feet away from the actual entry point.
      </p>
      <p>
        <strong>Urgent or monitor?</strong> Urgent. Active water means damage is happening
        right now to your decking, insulation, and drywall.
      </p>

      <h3>6. A sagging or dipping roofline</h3>
      <p>
        Stand across the street and look at the line of your roof. It should be straight. If
        you see a dip, a sag, or a wavy section, that's a structural warning — usually
        water-damaged decking or compromised rafters underneath.
      </p>
      <p>
        This is the most serious sign on the list. A sagging roof can mean the deck is rotting
        or, in rare cases, that the structure is failing.
      </p>
      <p>
        <strong>Urgent or monitor?</strong> Urgent. Don't wait on this one — call a roofer to
        assess it promptly.
      </p>

      <h3>7. Recurring ice dams or leaks at the eaves</h3>
      <p>
        If you get ice buildup along the edges of your roof every winter, or leaks that keep
        returning at the eaves, the problem usually isn't just the shingles. It's poor attic
        ventilation and insulation letting warm air melt snow unevenly, which refreezes at the
        edge and forces water back up under the roof.
      </p>
      <p>
        A roof that leaks at the eaves winter after winter often needs more than a patch — it
        needs the ventilation fixed, and sometimes a replacement done right with proper
        ice-and-water shield.
      </p>
      <p>
        <strong>Urgent or monitor?</strong> Recurring leaks — get the root cause diagnosed
        before another winter. A one-time minor ice dam — monitor and improve ventilation.
      </p>

      <h2>Does every sign mean you need a full replacement?</h2>
      <p>
        No — and any roofer who tells you it does is one to be cautious of. Plenty of these
        signs point to a repair, not a replacement. A handful of wind-damaged shingles, one
        leak around a chimney, a single bald patch — those are often fixable.
      </p>
      <p>
        The honest answer depends on three things: how old the roof is, how widespread the
        damage is, and whether repairs would cost a meaningful share of a replacement. As a
        rough guide, if your roof is under 15 years old and the damage is localized, repair
        usually wins. If it's over 20 with problems in several places, replacement is often
        the better value.{' '}
        <Link to="/services/roof-repair">We'll show you the repair option</Link> whenever one
        exists, and only recommend{' '}
        <Link to="/services/roof-replacement">a full replacement</Link> when it's genuinely
        the right move.
      </p>

      <h2>What to do if you spotted one of these signs</h2>
      <p>
        If you noticed even one sign on this list, the next step is simple and free: get the
        roof looked at by someone who'll be straight with you. A good inspection includes
        photos of anything wrong, a written summary, and a clear explanation of your options —
        repair, replace, or just keep an eye on it.
      </p>
      <p>
        At DTE Roofing, our owners Donovan and Mitchell — both Hilliard Davidson grads —
        personally handle inspections. We diagnose the real problem, show you the evidence,
        and recommend only what's actually needed. No pressure, no upselling.
      </p>

      <h2>The bottom line</h2>
      <p>
        Your roof will almost always warn you before it fails. Curling shingles, granules in
        the gutter, missing pieces, an aging roof, ceiling stains, a sagging line, or repeat
        ice-dam leaks are all signs worth taking seriously — some urgent, some just worth
        watching.
      </p>
      <p>
        If you've seen any of them, don't guess.{' '}
        <Link to="/contact">Book a free inspection</Link> and we'll tell you exactly where
        your roof stands and what it actually needs. Call DTE Roofing at 614-971-6028 — your
        neighbors in Columbus, Hilliard, and Dublin trust us to give it to them straight.
      </p>
    </>
  ),
  faqs: [
    {
      question: 'How do I know if I need a new roof or just a repair?',
      answer:
        'It comes down to roof age, how widespread the damage is, and cost. Localized damage on a roof under 15 years old is usually a repair. Widespread problems on a roof over 20 years old usually point to replacement. A free inspection with photos will give you a clear answer.',
    },
    {
      question: 'How long does a roof last in Ohio?',
      answer:
        "Most asphalt shingle roofs in Central Ohio last 20 to 30 years, with architectural shingles toward the higher end. Ohio's freeze-thaw cycles, hail, and humidity tend to shorten those ranges compared to milder climates, so a yearly inspection after year 15 is smart.",
    },
    {
      question: 'Should I check my roof after a hailstorm?',
      answer:
        "Yes. Hail damage often isn't visible from the ground — it shows as bruising and granule loss you can only see up close. Because storm damage may be covered by insurance, it's worth a free inspection within a few weeks of a major storm to document anything before the claim window closes.",
    },
    {
      question: 'Is a sagging roof an emergency?',
      answer:
        'Treat it as urgent. A sag usually means water-damaged decking or a structural issue underneath, and it can get worse quickly. Have a roofer assess it promptly rather than waiting for a leak to appear.',
    },
    {
      question: 'Do you charge for a roof inspection?',
      answer:
        "No. DTE Roofing provides free, no-obligation roof inspections across Columbus and Central Ohio. You'll get photos, a written summary, and honest recommendations — call 614-971-6028 to schedule.",
    },
  ],
};

export const blogPosts: BlogPost[] = [signsYouNeedANewRoof];

export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((p) => p.status === 'published')
    .sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.status === 'published');
}

/**
 * Format a YYYY-MM-DD calendar date as "Month D, YYYY" without timezone drift
 * (avoids SSR/CSR hydration mismatches caused by `new Date('YYYY-MM-DD')` being
 * parsed as UTC midnight and then localized).
 */
export function formatPostDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

