import { Link } from 'react-router-dom';
import ServicePageTemplate from '../../components/ServicePageTemplate';
import SchemaMarkup from '../../components/SchemaMarkup';
import reviewStats from '../../data/review-stats.json';

const faqs = [
  {
    question: 'How much does roof repair cost in Columbus?',
    answer: 'Roof repair costs vary based on the extent of damage, materials needed, and accessibility. Minor repairs like replacing a few shingles typically range from $300-$800, while more extensive repairs involving flashing or decking can range from $1,000-$3,000. We provide detailed written estimates before starting any work so you know exactly what to expect. Call us at 614-971-6028 for a free inspection and accurate quote.'
  },
  {
    question: 'How quickly can you repair my roof?',
    answer: 'For emergency situations like active leaks, we offer same-day or next-day service to prevent further damage. Most standard repairs are completed within 1-3 days, depending on weather conditions and the scope of work. We prioritize quick response times while never sacrificing quality.'
  },
  {
    question: 'Do you offer warranties on repairs?',
    answer: 'Yes! All our repairs come with comprehensive workmanship warranties. The specific warranty length depends on the type of repair, but typically ranges from 2-5 years. We also use materials backed by manufacturer warranties. We stand behind our work completely.'
  },
  {
    question: 'Should I repair or replace my roof?',
    answer: 'This depends on several factors: the age of your roof, extent of damage, and overall condition. If your roof is under 15 years old and damage is localized, repair is usually the best option. For roofs over 20 years old with widespread issues, replacement may be more cost-effective long-term. We always provide honest recommendations—we will never sell you a replacement if repairs will solve the problem.'
  },
  {
    question: 'Will you help with insurance claims?',
    answer: 'Absolutely. For storm damage, we work directly with your insurance company, providing detailed documentation, photos, and estimates to support your claim. We have extensive experience with the claims process and can help ensure you receive fair coverage for necessary repairs.'
  },
  {
    question: 'Can you match my existing shingles?',
    answer: 'In most cases, yes. We carry a wide range of shingles from leading manufacturers and can usually find an exact or very close match to your existing roof. For older roofs where exact matches are no longer available, we source the closest possible match to ensure repairs blend seamlessly.'
  },
  {
    question: 'Can you repair a roof in winter?',
    answer: 'Yes, we perform roof repairs year-round in Columbus, including winter months. However, winter repairs require special considerations. Temperatures below 40°F affect shingle adhesive properties, so we use cold-weather installation techniques and specialized materials when necessary. For emergency leaks causing active water damage, we respond regardless of weather conditions to prevent further harm to your home. Non-urgent repairs may be temporarily weatherproofed until spring when conditions are ideal for permanent repairs. We assess each situation individually and provide honest recommendations about timing. If you need emergency service during winter, our emergency services team is available to protect your home.'
  },
  {
    question: 'How long do roof repairs last?',
    answer: 'When done properly with quality materials, roof repairs should last as long as the surrounding original roofing—typically 10-20+ years depending on your roof\'s age and condition. The longevity of repairs depends on several factors: the quality of materials used, proper installation techniques, the severity of Central Ohio weather exposure, and regular maintenance. Minor shingle replacements and flashing repairs performed correctly should match your roof\'s remaining lifespan. We use premium materials and proven techniques to ensure repairs don\'t become recurring problems. All our work includes comprehensive workmanship warranties, demonstrating our confidence in repair longevity. Regular inspections every few years help identify small issues before they become major problems, extending both repair and roof lifespan.'
  },
  {
    question: 'Should I repair or replace before selling my home?',
    answer: 'This depends on your roof\'s condition, the local Columbus market, and your selling timeline. If your roof has minor damage that\'s visible or known to buyers, repairs are usually the cost-effective choice. Most home inspectors will flag roof issues, and buyers often request repairs or price reductions. Addressing problems proactively gives you control over costs and prevents last-minute negotiations. However, if your roof is over 20 years old or has widespread issues, potential buyers may factor full replacement into their offers anyway. In that case, you might negotiate the price rather than investing in extensive repairs. For homes in competitive Columbus neighborhoods like Dublin and Hilliard, a new or well-maintained roof can be a strong selling point that justifies premium pricing. We provide honest assessments for homeowners preparing to sell, helping you understand whether minor repairs, major repairs, or full replacement makes the most financial sense for your situation. Consider scheduling a pre-listing roof inspection to understand exactly what buyers\' inspectors will find, allowing you to address issues strategically.'
  }
];

export default function RoofRepair() {
  return (
    <>
      <SchemaMarkup
        type="service"
        service={{
          name: 'Roof Repair',
          description: 'Professional roof repair services in Columbus, OH. We provide honest diagnostics, precision repairs for leaks, storm damage, missing shingles, and all roofing issues. Emergency repairs available.',
          url: '/services/roof-repair'
        }}
        pageTitle="Roof Repair Columbus OH - Expert Leak & Storm Damage Repair"
        pageDescription={`Honest roof repair by hands-on experts in Columbus. ${reviewStats.reviewCount}+ five-star reviews. Book a free inspection today.`}
        pageUrl="https://www.dteroofingllc.com/services/roof-repair"
        faqs={faqs}
      />
      <ServicePageTemplate
        serviceName="Roof Repair"
        headline="Roof Repair in Columbus, OH — Honest Repairs That Last"
        slug="roof-repair"
        subheadline="Honest diagnostics by hands-on experts."
        metaDescription={`Roof repair in Columbus, OH by DTE Roofing — leak fixes, shingle replacement, flashing & storm damage. ${reviewStats.reviewCount}+ five-star reviews. Free inspection: 614-971-6028.`}
        keywords="roof repair Columbus OH, Columbus roofing company, roof repair near me, emergency roof repair Columbus, leak repair Columbus, storm damage repair, shingle replacement Columbus, roofing contractor Columbus"
      problemPromise={<>Every homeowner dreads finding a water stain on their ceiling or discovering missing shingles after a storm. Too many Columbus roofers will try to sell you a full replacement when a targeted repair would solve the problem—or worse, slap on a quick patch that fails in six months.
{'\n\n'}
At DTE Roofing, we take a different approach. Founded by two brothers, Donovan and Mitchell, who were both raised in Hilliard Ohio and graduated from Hilliard Davidson High School. They built DTE Roofing to deliver honest diagnostics and precision repairs.
{'\n\n'}
We personally inspect every roof, identify the root cause of your problem (not just the symptoms), and fix only what's needed. Whether it's damaged flashing, worn shingles, or a stubborn leak, we use premium materials and proven techniques to restore your roof's integrity. Our repairs blend seamlessly with your existing roof and come with comprehensive workmanship warranties.
{'\n\n'}
COMMON ROOF REPAIRS IN COLUMBUS
{'\n\n'}
Central Ohio's weather puts unique stress on roofing systems. From severe summer storms to winter ice dams, Columbus-area homes face challenges that require specific repair expertise. Our repair crews are especially active across <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> and <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, where we've built a strong reputation for honest diagnostics and lasting repairs.
{'\n\n'}
Leak Repair: Roof leaks rarely happen where water appears inside your home. Water can travel along rafters and decking before becoming visible. Our leak detection process traces water back to its true entry point—often damaged flashing around chimneys or vents, worn valley areas, or compromised pipe boots. We address the source, not just the symptom, ensuring leaks don't return.
{'\n\n'}
Shingle Replacement: Missing or damaged shingles expose your roof deck to moisture. Whether caused by wind, hail, or age, Columbus homeowners need prompt shingle replacement to prevent water infiltration. We carefully match your existing shingles in color and style, lifting surrounding shingles to weave in new ones for a seamless repair that maintains your roof's integrity and appearance.
{'\n\n'}
Flashing Repair: Flashing—the metal strips sealing roof transitions around chimneys, skylights, vents, and walls—is where many Columbus roofs develop leaks. Improper installation or deterioration from temperature extremes causes flashing to separate from roofing materials. Our technicians remove old flashing, address any underlying damage, and install new flashing using proper techniques and high-quality materials designed for Ohio's climate.
{'\n\n'}
Vent Boot Replacement: Plumbing vent boots deteriorate from sun exposure and temperature fluctuations. The rubber seal cracks, allowing water into your home. In <Link to="/locations/dublin" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Dublin</Link> and <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link>, we regularly replace failed vent boots, removing the old unit, inspecting the surrounding area for water damage, and installing a new boot with a weather-resistant rubber seal.
{'\n\n'}
Gutter-Related Damage: Clogged or damaged gutters cause water to back up under shingles, leading to fascia and soffit rot. We repair not only the immediate damage but also address the underlying gutter issues that caused the problem, protecting your roof edge from future water damage.
{'\n\n'}
REPAIR VS. REPLACEMENT: MAKING THE RIGHT DECISION
{'\n\n'}
One of the most important decisions Columbus homeowners face is whether to repair or replace their roof. Understanding the key factors helps you make an informed choice.
{'\n\n'}
When Repairs Are Sufficient:
{'\n'}
• Your roof is under 15 years old and damage is localized to specific areas
{'\n'}
• Only a few shingles are damaged or missing
{'\n'}
• Leak sources are identifiable and affect small sections
{'\n'}
• Storm damage is limited to specific impact zones
{'\n'}
• The roof deck structure remains sound without widespread deterioration
{'\n'}
• Your budget requires addressing immediate concerns before a full replacement
{'\n\n'}
Warning Signs That Indicate Replacement:
{'\n'}
• Your roof is over 20 years old with multiple problem areas
{'\n'}
• Shingles are curling, cupping, or losing significant granules across the entire roof
{'\n'}
• You're experiencing leaks in multiple locations
{'\n'}
• Daylight is visible through your attic roof boards
{'\n'}
• The roof has sagging sections indicating structural issues
{'\n'}
• Previous repairs have failed or new problems continue emerging
{'\n'}
• Energy bills have increased due to poor insulation and ventilation
{'\n\n'}
Cost-Benefit Analysis: In Central Ohio, a minor repair might cost $500-$1,500, while a major repair could run $2,000-$4,000. If your roof is nearing the end of its lifespan and requires repairs approaching 30% of replacement cost, replacement becomes more cost-effective. We provide honest assessments comparing repair costs to replacement benefits, helping you make the best long-term decision.
{'\n\n'}
For a comprehensive evaluation, consider scheduling a professional roof inspection to get a complete picture of your roof's condition.
{'\n\n'}
ROOF REPAIR COSTS IN CENTRAL OHIO
{'\n\n'}
Understanding typical repair costs helps Columbus homeowners budget appropriately and recognize fair pricing.
{'\n\n'}
Typical Price Ranges:
{'\n'}
• Minor shingle repairs (5-10 shingles): $300-$800
{'\n'}
• Flashing repairs: $400-$1,200 depending on location and extent
{'\n'}
• Vent boot replacement: $200-$500 per boot
{'\n'}
• Valley repairs: $500-$1,500 depending on length and materials
{'\n'}
• Small leak repairs: $400-$1,000
{'\n'}
• Moderate repairs with decking replacement: $1,500-$3,000
{'\n'}
• Extensive repairs covering multiple issues: $3,000-$6,000
{'\n\n'}
Factors Influencing Pricing:
{'\n\n'}
Materials: Premium architectural shingles cost more than basic 3-tab shingles. Copper flashing costs more than aluminum. Quality materials last longer and provide better protection in Ohio's weather, making them worth the investment.
{'\n\n'}
Labor Complexity: Steep-pitch roofs in Grove City require additional safety equipment and time. Homes with multiple levels, complex architecture, or numerous roof penetrations increase labor hours. Second-story repairs take longer than single-story work.
{'\n\n'}
Accessibility: Homes surrounded by landscaping, with limited roof access, or in areas requiring special equipment incur higher costs. Hillside properties in Dublin or homes with attached structures affecting access may require additional preparation time.
{'\n\n'}
Extent of Damage: A simple shingle replacement is straightforward. However, if water has damaged underlying decking, repairs become more involved. Storm damage often reveals hidden issues once we remove damaged materials, requiring adjustments to the repair scope.
{'\n\n'}
Seasonal Considerations: Emergency repairs during winter storms or after major weather events may involve emergency service fees. Planning non-urgent repairs during our moderate seasons (spring and fall) can sometimes offer scheduling flexibility.
{'\n\n'}
For <Link to="/locations/hilliard" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Hilliard</Link> and <Link to="/locations/columbus" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">Columbus</Link> homeowners dealing with storm damage, our storm damage assessment can help determine if insurance coverage applies, potentially reducing your out-of-pocket costs significantly.</>}
      whatWeDo={[
        'Emergency leak detection and repair',
        'Damaged or missing shingle replacement',
        'Flashing repairs around chimneys, vents, and skylights',
        'Storm and wind damage restoration',
        'Valley and ridge cap repairs',
        'Professional Decking',
        'Ice dam damage remediation',
        'Gutter and downspout repairs'
      ]}
      processSteps={[
        {
          number: '1',
          title: 'Inspect',
          description: 'We conduct a hands-on inspection to identify all issues—not just surface symptoms. You receive photos and a detailed written report explaining exactly what needs repair.'
        },
        {
          number: '2',
          title: 'Explain',
          description: 'We walk you through our findings in plain language, showing you the damaged areas and explaining your options. No pressure, no upselling—just honest recommendations.'
        },
        {
          number: '3',
          title: 'Repair',
          description: 'Our skilled crew uses premium materials and proven techniques to fix the root cause. We match your existing shingles and ensure repairs blend seamlessly.'
        },
        {
          number: '4',
          title: 'Final Review & Warranty',
          description: 'We perform a final inspection to verify quality, clean up the job site completely, and provide you with workmanship warranty documentation.'
        }
      ]}
      faqs={faqs}
      relatedServices={[
        { name: 'Roof Inspection', link: '/services/roof-inspection' },
        { name: 'Roof Replacement', link: '/services/roof-replacement' },
        { name: 'Emergency Services', link: '/services/emergency-services' },
        { name: 'Storm Damage Repair', link: '/services/storm-damage' }
      ]}
    />
    </>
  );
}
