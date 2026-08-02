export const site = {
  name: "BelleVue",
  tagline: "ARCHITECTURE MADE SIMPLE",
  whatsapp: "https://wa.me/7034994100",
  phone: "+91 7034994100",
  email: "contact@bellevuearchitects.com",
  location: "Banglore",
} as const;

export const navLinks = [
  { label: "Who we are", href: "/who-we-are" },
  { label: "Our services", href: "/services" },
  { label: "Our projects", href: "/our-projects" },
] as const;

export const heroSlides = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
] as const;

export const stats = [
  { value: 50, label: "Projects Completed." },
  { value: 2, label: "Years of Industry Experience." },
] as const;

export type ProcessStep = {
  /** Anchor on /services, so the home page can deep-link into a stage. */
  slug: string;
  title: string;
  body: string;
  image: string;
  /** Longer treatment, shown only on the services page. */
  detail: string[];
};

/** The five-stage engagement, shown as alternating image/copy rows. */
export const processSteps: ProcessStep[] = [
  {
    slug: "vision",
    title: "Understanding Your Vision",
    body: "We start by understanding your requirements, lifestyle, and budget in depth, offering expert guidance drawn from years of architectural practice.",
    image: "/images/1.jpg",
    detail: [
      "We begin with a conversation. We sit down with you to understand the style and atmosphere you want, review any reference imagery or plans you already have, and talk through how you actually intend to live or work in the space.",
      "Those discussions, alongside a careful analysis of your functional needs and budget, lay the foundation for a project that reflects you rather than a template.",
    ],
  },
  {
    slug: "research",
    title: "Site Study & Research",
    body: "We survey the site and research the materials, regulations, and design directions that best suit your plot, your vision, and your budget.",
    image: "/images/who-we-are.jpg",
    detail: [
      "We survey the plot in person — orientation, light, drainage, access, and the surrounding context all shape what the building wants to be.",
      "In parallel we work through local building regulations and approvals, and research the materials and suppliers that suit your project, so the design we bring you is already grounded in what is buildable.",
    ],
  },
  {
    slug: "proposal",
    title: "Tailored Design Proposal",
    body: "We present detailed drawings, 3D visualisations, and transparent costing — refining the design until it aligns perfectly with your expectations.",
    image: "/images/bespoke-designs.jpg",
    detail: [
      "You receive a complete proposal: floor plans, elevations, 3D visualisations of the key spaces, and a transparent breakdown of what it will cost to build.",
      "Nothing moves forward until you are happy. We refine the drawings with you through as many rounds as it takes for the design to feel right.",
    ],
  },
  {
    slug: "execution",
    title: "Meticulous Execution",
    body: "Our team manages every aspect of the build with close attention to detail, from vendor coordination and material procurement to on-site supervision.",
    image: "/images/2.jpg",
    detail: [
      "A single point of contact oversees your project from groundbreaking to handover, so you are never chasing updates across multiple parties.",
      "We coordinate contractors against the drawings, track material orders and deliveries against the programme, and supervise on site to hold the quality of the finish.",
      "We are committed to delivering your project on time and on budget, without compromising on quality.",
    ],
  },
  {
    slug: "support",
    title: "After-Sales Support",
    body: "Our commitment extends well beyond handover. We conduct a final walkthrough and revisit at 30/60/90 days to assess functionality, aesthetics, and comfort.",
    image: "/images/3.jpg",
    detail: [
      "We close the project with a full walkthrough together, working through anything that needs attention before you settle in.",
      "We then return at 30, 60, and 90 days to see how the space is performing in daily use — how it functions, how it has weathered, and how comfortable it feels — and we remain available for warranty questions and maintenance guidance well beyond that.",
    ],
  },
];

export type Value = { title: string; body: string };

/** Principles shown on the who-we-are page. */
export const values: Value[] = [
  {
    title: "Dedication",
    body: "At BelleVue, we don't simply take on projects – we make your aspirations our mission until they are fully realized. Our team is vested in our clients' success, working tirelessly to ensure the finished result perfectly reflects their vision.",
  },
  {
    title: "Trust",
    body: "We build long-lasting relationships with our clients by being transparent and consistently delivering on our promises. Our commitment to honesty and credibility is the foundation of everything we do.",
  },
  {
    title: "Continuous Improvement",
    body: "We are committed to staying ahead of industry trends, expanding our knowledge, and perfecting our craftsmanship. We forge new partnerships with top vendors and suppliers to offer our clients the latest innovations and guidance.",
  },
  {
    title: "Client Centricity",
    body: "Your brief leads the process. We tailor every solution to how you intend to live and work, offering bespoke guidance that aligns with your distinct lifestyle and functional needs.",
  },
  {
    title: "Excellence",
    body: "We specify quality materials through suppliers we have vetted ourselves, and we hold that standard through to the final finish and walkthrough.",
  },
];

/** Short differentiators repeated on the who-we-are page. */
export const differences: Value[] = [
  {
    title: "End-to-End Solutions",
    body: "We provide a hassle-free experience for our clients by handling every aspect of the furnishing process from start to finish. Our comprehensive service encompasses initial concept development, coordination with suppliers, and meticulous installation, ensuring that every space is not only visually stunning but also fully functional.",
  },
  {
    title: "No Variety Restrictions",
    body: "Our ability to translate unique visions into reality sets us apart. We are not bound by sales targets or restricted to specific suppliers, allowing us to work with any vendor that meets our standards. We also specialize in sourcing bespoke furniture that harmonize with each space's distinct character.",
  },
  {
    title: "Superior Quality",
    body: "We are dedicated to delivering unparalleled quality. Our carefully selected partnerships grant us access to the finest materials, premium craftsmanship, and rigorous control processes, guaranteeing that every piece meets or exceeds clients' expectations.",
  },
  {
    title: "After-Sales Support",
    body: "Our commitment to our clients extends beyond project completion. We provide ongoing support and after-sales service to address any future needs or concerns. Whether you require maintenance, repairs, or wish to modify your space, our team is ready to assist, ensuring your continued satisfaction.",
  },
];

export type ChooseCard = {
  title: string;
  body: string;
  variant: "light" | "dark" | "image";
  image?: string;
  /** Explicit placement in the desktop bento, so DOM order stays readable. */
  span?: string;
  /** Decorative flourish keyed by the card that owns it. */
  motif?: "mark" | "orb";
  /** Second copy block — only the tall right-hand column carries one. */
  secondary?: { title: string; body: string };
};

/**
 * Four cards in a 3-column bento: two light cards over a wide image card, with
 * one full-height card down the right carrying two blocks of copy.
 */
export const chooseCards: ChooseCard[] = [
  {
    title: "End-to-End Solutions",
    body: "We manage every aspect of your residential and commercial projects, saving you time and resources.",
    variant: "light",
    motif: "mark",
    span: "lg:col-start-1 lg:row-start-1",
  },
  {
    title: "After-Sales Support",
    body: "A site visit within 30/60/90 days after project completion to assess functionality, aesthetics, and user comfort.",
    variant: "light",
    motif: "orb",
    span: "lg:col-start-2 lg:row-start-1",
  },
  {
    title: "Superior Quality",
    body: "Our partnership with the best suppliers grants us access to the finest materials, craftsmanship and quality control processes.",
    variant: "image",
    image: "/images/bespoke-designs.jpg",
    span: "sm:col-span-2 lg:col-start-1 lg:row-start-2",
  },
  {
    title: "No Design Restrictions",
    body: "We work with any vendor or material that meets our quality standards, giving you the broadest range of design solutions to suit your needs.",
    variant: "dark",
    span: "sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-2",
    secondary: {
      title: "Bespoke Designs",
      body: "We specialize in sourcing custom-made pieces that perfectly match your unique vision and requirements.",
    },
  },
];

export type Project = {
  id: string;
  title: string;
  client: string;
  subtitle: string;
  image: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "negroponte-resort",
    title: "Negroponte Resort Eretria",
    client: "NEGROPONTE",
    subtitle: "Resort Eretria",
    image: "/images/project-1.jpg",
    tags: [
      "Bedside tables",
      "Guest room furniture",
      "Partial refurbishment",
      "Resort renovation",
    ],
  },
  {
    id: "sheraton-rhodes",
    title: "Sheraton Rhodes Resort",
    client: "SHERATON",
    subtitle: "Rhodes Resort",
    image: "/images/project-2.jpg",
    tags: [
      "5-star hotel",
      "Lobby",
      "Lounge furniture",
      "Resort renovation",
    ],
  },
  {
    id: "bellevue-luxury-villas",
    title: "BelleVue Luxury Residences",
    client: "BELLEVUE",
    subtitle: "Private Villa",
    image: "/images/1.jpg",
    tags: [
      "Luxury villa",
      "Custom joinery",
      "Full interior",
      "Bespoke furniture",
    ],
  },
  {
    id: "grand-horizon-hotel",
    title: "The Grand Horizon Hotel",
    client: "HORIZON",
    subtitle: "Boutique Hotel",
    image: "/images/2.jpg",
    tags: [
      "Boutique hotel",
      "Dining room",
      "Architectural lighting",
      "Renovation",
    ],
  },
];

export const footerMenu = [
  { label: "Who we are", href: "/who-we-are" },
  { label: "Our services", href: "/services" },
  { label: "Our projects", href: "/our-projects" },
  { label: "Why choose us", href: "/#why-choose-us" },
  { label: "Contact us", href: site.whatsapp },
] as const;
