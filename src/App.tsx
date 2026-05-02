import { useEffect, useMemo, useState } from "react";

type Page = "home" | "about" | "properties" | "details" | "services" | "locations" | "blog" | "testimonials" | "contact";

type Property = {
  id: number;
  name: string;
  location: string;
  city: string;
  type: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  status: string;
  image: string;
  description: string;
};

const nav: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "about", label: "About" },
  { page: "properties", label: "Properties" },
  { page: "services", label: "Services" },
  { page: "locations", label: "Locations" },
  { page: "blog", label: "Insights" },
  { page: "testimonials", label: "Reviews" },
  { page: "contact", label: "Contact" },
];

const properties: Property[] = [
  {
    id: 1,
    name: "The Aurelia Sky Villas",
    location: "Palm District, Dubai Marina",
    city: "Dubai",
    type: "Villa",
    price: 4250000,
    beds: 5,
    baths: 6,
    area: 6400,
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    description: "A cinematic waterfront villa with private elevator, wellness terrace, and skyline views.",
  },
  {
    id: 2,
    name: "Eden Reserve Residences",
    location: "Golf Estate, Bengaluru",
    city: "Bengaluru",
    type: "Apartment",
    price: 1180000,
    beds: 4,
    baths: 4,
    area: 3220,
    status: "New Launch",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    description: "Ultra-private residences crafted around club living, gardens, and quiet luxury.",
  },
  {
    id: 3,
    name: "Noir One Commercial Tower",
    location: "BKC Financial Core, Mumbai",
    city: "Mumbai",
    type: "Commercial",
    price: 2720000,
    beds: 0,
    baths: 8,
    area: 7800,
    status: "Limited Inventory",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    description: "Grade-A office suites with double-height lobby, smart access, and institutional yields.",
  },
  {
    id: 4,
    name: "Casa Veridian Plots",
    location: "Airport Growth Corridor, Hyderabad",
    city: "Hyderabad",
    type: "Plot",
    price: 385000,
    beds: 0,
    baths: 0,
    area: 2400,
    status: "Pre-Launch",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
    description: "Gated villa plots in a fast-appreciating corridor with clear titles and resort amenities.",
  },
  {
    id: 5,
    name: "Lumiere Penthouses",
    location: "Lutyens Enclave, New Delhi",
    city: "Delhi",
    type: "Penthouse",
    price: 6100000,
    beds: 6,
    baths: 7,
    area: 9100,
    status: "Private Sale",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
    description: "A rare duplex penthouse with landscaped decks, art walls, and private concierge.",
  },
  {
    id: 6,
    name: "Serene Coast Villas",
    location: "Assagao, Goa",
    city: "Goa",
    type: "Villa",
    price: 1960000,
    beds: 4,
    baths: 5,
    area: 5200,
    status: "Rental Yield 7.8%",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=85",
    description: "Tropical estate villas designed for holiday homes, managed rentals, and capital growth.",
  },
];

const insights = [
  ["2026 Luxury Real Estate Outlook", "Market Trends", "How branded residences, wellness amenities, and transit-led corridors are reshaping high-value property decisions."],
  ["A Buyer's Guide to Pre-Launch Projects", "Buying Tips", "Due diligence, payment plans, RERA checks, and negotiation signals every premium buyer should know."],
  ["Design Details That Increase Rental Yield", "Interior Design", "From lighting temperature to concierge-grade storage, small upgrades that improve returns."],
];

const heroImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=90",
];

const pageMeta: Record<Page, { title: string; description: string }> = {
  home: { title: "Aureum Estates | Luxury Real Estate Developers and Advisors", description: "Discover luxury villas, apartments, plots, and commercial properties with premium advisory, intelligent search, and concierge-grade real estate services." },
  about: { title: "About Aureum Estates | Trusted Luxury Property Consultants", description: "Meet the leadership, vision, awards, and legacy behind a premium real estate advisory and development brand." },
  properties: { title: "Luxury Properties for Sale | Villas, Apartments, Plots and Offices", description: "Search premium real estate with smart filters, favorites, comparison, location insights, and high-conversion inquiry tools." },
  details: { title: "The Aurelia Sky Villas | Property Details and Virtual Tour", description: "Explore a world-class luxury property experience with gallery, amenities, floor plans, maps, mortgage calculator, and schedule visit form." },
  services: { title: "Real Estate Services | Buying, Selling, Rentals and Investment", description: "End-to-end property buying, selling, leasing, legal, valuation, investment, and interior consultation services." },
  locations: { title: "Top Real Estate Locations | Investment Zones and Area Insights", description: "Explore premium city corridors, infrastructure growth, maps, and trending investment locations." },
  blog: { title: "Real Estate Insights | Market Trends, Buying Tips and Finance", description: "SEO-rich real estate guides covering news, investment, buying, finance, interiors, and location strategy." },
  testimonials: { title: "Client Testimonials | Luxury Property Success Stories", description: "Read customer reviews, video testimonials, ratings, and before-after property journeys." },
  contact: { title: "Contact Aureum Estates | Schedule a Private Consultation", description: "Contact our premium real estate advisory team by phone, email, WhatsApp, office visits, or inquiry form." },
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

function useHashRoute() {
  const getPage = () => ((window.location.hash.replace("#", "") || "home") as Page);
  const [page, setPage] = useState<Page>(getPage);

  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (next: Page) => {
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { page: nav.some((item) => item.page === page) || page === "details" ? page : "home", go };
}

function Icon({ children }: { children: string }) {
  return <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-xs font-medium text-[#8a6b32]">{children}</span>;
}

function Navbar({ page, go }: { page: Page; go: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
        <button onClick={() => go("home")} className="group text-left" aria-label="Aureum Estates home">
          <span className="block font-serif text-xl tracking-[0.2em] text-stone-900">AUREUM</span>
          <span className="block text-[9px] uppercase tracking-[0.3em] text-[#8a6b32]">Estates</span>
        </button>
        <div className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <button key={item.page} onClick={() => go(item.page)} className={`text-sm transition hover:text-[#8a6b32] ${page === item.page ? "text-[#8a6b32]" : "text-stone-600"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => go("contact")} className="hidden rounded-full bg-stone-900 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#8a6b32] lg:inline-flex">
          Consultation
        </button>
        <button className="lg:hidden text-stone-900" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">Menu</button>
      </nav>
      {open && (
        <div className="border-t border-stone-100 bg-white px-5 py-5 lg:hidden">
          <div className="grid gap-3">
            {nav.map((item) => (
              <button key={item.page} onClick={() => { go(item.page); setOpen(false); }} className="text-left text-stone-700">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function SearchBar({ go }: { go: (page: Page) => void }) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); go("properties"); }} className="glass mx-auto grid w-full max-w-5xl gap-3 p-3 md:grid-cols-5" aria-label="Advanced property search">
      {[
        ["Location", "Dubai, Goa, Mumbai"],
        ["Property Type", "Villa, Apartment"],
        ["Budget", "$300k - $6M"],
        ["Bedrooms", "2 - 6 Beds"],
      ].map(([label, value]) => (
        <label key={label} className="rounded-xl bg-white px-4 py-3 text-left shadow-sm">
          <span className="block text-[10px] uppercase tracking-widest text-stone-500">{label}</span>
          <input className="mt-1 w-full bg-transparent text-sm text-stone-900 outline-none" placeholder={value} />
        </label>
      ))}
      <button className="rounded-xl bg-stone-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#8a6b32]">Search</button>
    </form>
  );
}

function SectionIntro({ eyebrow, title, copy, align = "center" }: { eyebrow: string; title: string; copy?: string; align?: "left" | "center" }) {
  return (
    <div className={`reveal mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6b32]">{eyebrow}</p>
      <h2 className="font-serif text-3xl leading-tight text-stone-900 md:text-4xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-relaxed text-stone-600">{copy}</p>}
    </div>
  );
}

function PropertyCard({ property, view = "grid", toggleFavorite, favorite, compare, toggleCompare, go }: { property: Property; view?: "grid" | "list"; toggleFavorite: (id: number) => void; favorite: boolean; compare: boolean; toggleCompare: (id: number) => void; go: (page: Page) => void }) {
  return (
    <article className={`group overflow-hidden rounded-2xl border border-stone-200 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200 ${view === "list" ? "grid md:grid-cols-[0.9fr_1.1fr]" : ""}`}>
      <button onClick={() => go("details")} className="relative block h-64 w-full overflow-hidden text-left">
        <img src={property.image} alt={`${property.name} luxury real estate`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-stone-900 backdrop-blur">{property.status}</span>
      </button>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-stone-900">{formatPrice(property.price)}</p>
            <h3 className="mt-1 font-serif text-xl text-stone-900">{property.name}</h3>
            <p className="mt-1 text-xs text-stone-500">{property.location}</p>
          </div>
          <button onClick={() => toggleFavorite(property.id)} className={`rounded-full border px-3 py-1.5 text-xs transition ${favorite ? "border-[#8a6b32] bg-[#8a6b32] text-white" : "border-stone-200 text-stone-600 hover:border-stone-400"}`} aria-label="Save property">
            {favorite ? "Saved" : "Save"}
          </button>
        </div>
        <p className="mt-4 text-sm text-stone-600 line-clamp-2">{property.description}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-stone-600">
          <span>{property.type}</span><span>•</span><span>{property.beds || "Studio"} Beds</span><span>•</span><span>{property.baths} Baths</span><span>•</span><span>{property.area.toLocaleString()} sq ft</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => go("details")} className="rounded-full bg-stone-900 px-5 py-2 text-xs font-medium text-white transition hover:bg-[#8a6b32]">Details</button>
          <button onClick={() => toggleCompare(property.id)} className={`rounded-full border px-5 py-2 text-xs font-medium transition ${compare ? "border-stone-900 bg-stone-50 text-stone-900" : "border-stone-200 text-stone-700 hover:border-stone-400"}`}>{compare ? "In Compare" : "Compare"}</button>
        </div>
      </div>
    </article>
  );
}

function LeadForm({ title = "Private Callback" }: { title?: string }) {
  return (
    <form className="grid gap-4 rounded-3xl border border-stone-200 bg-white p-7 shadow-xl shadow-stone-100" onSubmit={(event) => event.preventDefault()}>
      <h3 className="font-serif text-2xl text-stone-900">{title}</h3>
      <input className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#8a6b32]" placeholder="Full name" />
      <input className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#8a6b32]" placeholder="Phone or WhatsApp" />
      <input className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-[#8a6b32]" placeholder="Preferred location" />
      <button className="rounded-xl bg-stone-900 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#8a6b32]">Send Inquiry</button>
    </form>
  );
}

function Home({ go, toggleFavorite, favorites, compare, toggleCompare }: { go: (page: Page) => void; toggleFavorite: (id: number) => void; favorites: number[]; compare: number[]; toggleCompare: (id: number) => void }) {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % heroImages.length), 4800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main>
      <section className="relative min-h-[90vh] overflow-hidden bg-stone-900 text-white">
        {heroImages.map((image, index) => (
          <img key={image} src={image} alt="Cinematic luxury property hero" className={`absolute inset-0 h-full w-full object-cover transition duration-[1600ms] ${index === slide ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-stone-900/80" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-5 pb-16 pt-32 lg:px-8">
          <div className="max-w-3xl animate-heroReveal">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-200">Aureum Estates</p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">Luxury real estate,<br/>curated with discretion.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90">A premium property advisory for landmark villas, branded residences, commercial assets, and high-growth land investments.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => go("properties")} className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-stone-900 transition hover:-translate-y-0.5 hover:bg-stone-100">Explore</button>
              <button onClick={() => go("contact")} className="rounded-full border border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:bg-white/10">Consultation</button>
            </div>
          </div>
          <div className="mt-16 animate-fadeUp"><SearchBar go={go} /></div>
        </div>
      </section>

      <section className="bg-stone-50 px-5 py-20 lg:px-8">
        <SectionIntro eyebrow="Signature Portfolio" title="Featured residences" copy="Handpicked assets selected for architecture, location strength, livability, and long-term value." />
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.slice(0, 3).map((property) => <PropertyCard key={property.id} property={property} toggleFavorite={toggleFavorite} favorite={favorites.includes(property.id)} compare={compare.includes(property.id)} toggleCompare={toggleCompare} go={go} />)}
        </div>
        <div className="mt-12 text-center">
          <button onClick={() => go("properties")} className="text-sm font-medium text-stone-900 underline underline-offset-4 hover:text-[#8a6b32]">View entire portfolio</button>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <SectionIntro eyebrow="Why Choose Us" title="Private advisory, public-market intelligence" copy="Our team combines developer access, legal diligence, finance guidance, and data-led location strategy." />
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {[["01", "Verified Inventory", "Every asset is title-checked, RERA-reviewed, and matched to buyer intent."], ["02", "Negotiation Power", "Preferred access to developer allocations, off-market homes, and launch pricing."], ["03", "Lifecycle Support", "From site visit to interiors, leasing, resale, and portfolio growth."]].map(([num, title, copy]) => (
            <div key={title} className="reveal border-t border-stone-200 pt-6">
              <Icon>{num}</Icon>
              <h3 className="mt-5 font-serif text-2xl text-stone-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid min-h-[600px] bg-stone-50 lg:grid-cols-2">
        <div className="relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85" alt="Luxury interior showcase" loading="lazy" className="h-full min-h-[400px] w-full object-cover parallax-slow" />
        </div>
        <div className="flex items-center px-5 py-16 lg:px-16">
          <div className="reveal max-w-lg">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6b32]">About Aureum</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-900 md:text-4xl">A boutique property house for decisive investors.</h2>
            <p className="mt-5 text-base leading-relaxed text-stone-600">We represent premium developers, family offices, founders, and global buyers seeking rare homes and high-performing real estate. Our process blends emotional storytelling with institutional-grade diligence.</p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-stone-200 pt-6">
              {[["$1.8B", "Assets advised"], ["21", "Cities"], ["97%", "Referral"]].map(([value, label]) => <div key={label}><p className="font-serif text-2xl text-stone-900">{value}</p><p className="mt-1 text-[10px] uppercase tracking-widest text-stone-500">{label}</p></div>)}
            </div>
            <button onClick={() => go("about")} className="mt-8 rounded-full bg-stone-900 px-6 py-3 text-xs font-medium text-white transition hover:bg-[#8a6b32]">Our Story</button>
          </div>
        </div>
      </section>

      <Showcase />
      <Categories go={go} />
      <Investment />
      <TestimonialsPreview />
      <VideoWalkthrough />
      <LocationsPreview />
      <Partners />
      <BlogPreview go={go} />
      <CalculatorPreview />
      <ContactCTA go={go} />
    </main>
  );
}

function Showcase() {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Showcase" title="Architecture with emotional gravity" copy="Editorial visuals, private galleries, and virtual tours help buyers feel the lifestyle before they visit." />
      <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-4 md:grid-rows-2">
        {["https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=85"].map((image, index) => (
          <div key={image} className={`overflow-hidden rounded-2xl ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
            <img src={image} alt="Premium property gallery" loading="lazy" className="h-64 w-full object-cover transition duration-700 hover:scale-[1.03] md:h-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories({ go }: { go: (page: Page) => void }) {
  return (
    <section className="bg-stone-50 px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Categories" title="One platform for every premium goal" />
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
        {["Luxury Villas", "Sky Apartments", "Commercial Towers", "Gated Plots"].map((item) => (
          <button key={item} onClick={() => go("properties")} className="reveal min-h-48 rounded-2xl border border-stone-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-lg">
            <span className="text-[10px] uppercase tracking-widest text-stone-500">Explore</span>
            <h3 className="mt-12 font-serif text-xl text-stone-900">{item}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}

function Investment() {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6b32]">Investment Strategy</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-900 md:text-4xl">Data-led assets for resilient wealth.</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">We shortlist pre-launch, rental-yield, redevelopment, and commercial opportunities using demand absorption, infrastructure, and exit liquidity signals.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[["7.8%", "Target Yield"], ["18-36 mo", "Horizon"], ["A+", "Location Score"]].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-stone-100 bg-stone-50 p-6 text-center shadow-sm">
              <p className="font-serif text-3xl text-stone-900">{value}</p>
              <p className="mt-2 text-[10px] uppercase tracking-widest text-stone-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  return (
    <section className="bg-stone-50 px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Client Voices" title="Trusted by founders and family offices" />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {["Aureum converted a complex cross-border purchase into a calm, transparent experience.", "Their launch access saved us weeks and secured a better stack in the tower.", "The team understood privacy, design, and resale value better than any broker we met."].map((quote, index) => (
          <blockquote key={quote} className="reveal rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm leading-relaxed text-stone-700">"{quote}"</p>
            <cite className="mt-4 block text-[10px] uppercase tracking-widest text-[#8a6b32]">Client {index + 1}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function VideoWalkthrough() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-stone-900 text-white">
      <img src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=2200&q=85" alt="Video walkthrough luxury property" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
      <div className="relative mx-auto flex min-h-[500px] max-w-6xl items-center px-5 lg:px-8">
        <div className="reveal max-w-lg">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-300">Walkthrough</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">Tour the residence before the viewing.</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-200">Cinematic walkthroughs, 3D tours, drone context, and narrated floor-plan guidance reduce uncertainty and increase qualified leads.</p>
          <button className="mt-6 rounded-full border border-white/40 px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition hover:bg-white/10">Play Virtual Tour</button>
        </div>
      </div>
    </section>
  );
}

function LocationsPreview() {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Featured Locations" title="High-conviction city corridors" />
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
        {["Dubai Marina", "Goa North", "Mumbai BKC", "Bengaluru Golf Estate"].map((city) => (
          <div key={city} className="border-t border-stone-200 pt-5">
            <h3 className="font-serif text-xl text-stone-900">{city}</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">Transit, lifestyle, and scarcity indicators are trending upward.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="border-y border-stone-100 bg-stone-50 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
        <span>RERA Ready</span><span>Forbes Realty</span><span>Architect Digest</span><span>Knight Valuation</span><span>Green Gold</span>
      </div>
    </section>
  );
}

function BlogPreview({ go }: { go: (page: Page) => void }) {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Insights" title="Market intelligence for serious buyers" />
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {insights.map(([title, category, copy]) => (
          <article key={title} className="reveal border-t border-stone-200 pt-5">
            <p className="text-[10px] uppercase tracking-widest text-[#8a6b32]">{category}</p>
            <h3 className="mt-3 font-serif text-xl text-stone-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{copy}</p>
            <button onClick={() => go("blog")} className="mt-4 text-xs font-medium text-stone-900 underline underline-offset-4 hover:text-[#8a6b32]">Read insight</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function CalculatorPreview() {
  const [amount, setAmount] = useState(900000);
  const emi = Math.round((amount * 0.0085 * Math.pow(1.0085, 240)) / (Math.pow(1.0085, 240) - 1));
  return (
    <section className="bg-stone-50 px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6b32]">Mortgage Preview</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-900 md:text-4xl">Estimate buying power instantly.</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">A lead-friendly EMI calculator helps prospects qualify themselves before a private consultation.</p>
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-stone-100">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">Loan amount: <span className="text-stone-900">{formatPrice(amount)}</span></label>
          <input type="range" min="250000" max="5000000" step="50000" value={amount} onChange={(event) => setAmount(Number(event.target.value))} className="mt-4 w-full accent-[#8a6b32]" />
          <p className="mt-5 font-serif text-4xl text-stone-900">{formatPrice(emi)}<span className="text-sm font-sans text-stone-500"> / month</span></p>
        </div>
      </div>
    </section>
  );
}

function ContactCTA({ go }: { go: (page: Page) => void }) {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6b32]">Lead Generation</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-900 md:text-4xl">Ready to shortlist exceptional real estate?</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-600">Tell us your budget, purpose, and timeline. A senior advisor will return with a curated shortlist and visit plan.</p>
          <button onClick={() => go("contact")} className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#8a6b32]">Advisory Desk</button>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <main className="pt-20">
      <SubHero title="Built on trust, taste, and transaction intelligence." eyebrow="About Aureum Estates" image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85" />
      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div><SectionIntro align="left" eyebrow="Company" title="A private real estate house for premium decisions" /></div>
          <p className="text-base leading-relaxed text-stone-600 lg:pt-8">Aureum Estates partners with developers, builders, brokers, and discerning buyers to source, evaluate, and transact exceptional real estate. Our team has delivered residential towers, plotted communities, holiday homes, and commercial assets across leading growth corridors.</p>
        </div>
      </section>
      <section className="bg-stone-50 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Founder message</h2>
            <p className="mt-5 text-base leading-relaxed text-stone-600">"Luxury real estate is not about selling inventory. It is about protecting capital, honoring aspirations, and creating a confident journey from first conversation to handover."</p>
            <p className="mt-4 text-sm font-semibold text-stone-900">Aria Mehra, Managing Director</p>
          </div>
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85" alt="Founder portrait" loading="lazy" className="h-80 w-full rounded-2xl object-cover" />
        </div>
      </section>
      <InfoGrid title="Vision, mission, and trust indicators" items={["Vision: Make premium real estate advisory transparent, beautiful, and measurable.", "Mission: Curate verified inventory with institutional diligence and hospitality-grade service.", "Trust: RERA-aligned workflows, secure documentation, escrow guidance, and legal partners.", "Achievements: 2,400+ families served, 38 developer mandates, 14 awards, 21 active markets."]} />
      <Timeline />
      <Team />
      <OfficeGallery />
    </main>
  );
}

function SubHero({ title, eyebrow, image }: { title: string; eyebrow: string; image: string }) {
  return (
    <section className="relative min-h-[450px] overflow-hidden bg-stone-900 text-white">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 to-stone-900/80" />
      <div className="relative mx-auto flex min-h-[450px] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 lg:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-300">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">{title}</h1>
      </div>
    </section>
  );
}

function InfoGrid({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Operating Principles" title={title} />
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-stone-100 bg-stone-50 p-6 shadow-sm">
            <p className="text-sm leading-relaxed text-stone-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="bg-stone-50 px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Timeline" title="A decade of curated growth" />
      <div className="mx-auto max-w-4xl space-y-6">
        {[["2014", "Founded as a boutique advisory desk."], ["2017", "Launched developer sales mandates."], ["2020", "Opened NRI and family office division."], ["2024", "Crossed $1.8B in advised assets."], ["2026", "Introduced AI-assisted shortlisting dashboards."]].map(([year, text]) => (
          <div key={year} className="grid gap-3 border-t border-stone-200 pt-5 md:grid-cols-[140px_1fr]">
            <p className="font-serif text-2xl text-[#8a6b32]">{year}</p>
            <p className="text-sm text-stone-700 md:pt-1">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="bg-white px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Leadership" title="Senior specialists, not sales pressure" />
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">
        {["Investment Strategy", "Luxury Residential", "Commercial Leasing", "Legal Diligence"].map((role, index) => (
          <div key={role}>
            <img src={`https://images.unsplash.com/photo-${[1560250097, 1573496359142, 1519085360753, 1580489944761][index]}-${["0b93528c311a", "c93fb21aefd6", "5b647c8a66c1", "d0b88b1d37f8"][index]}?auto=format&fit=crop&w=600&q=85`} alt={role} loading="lazy" className="h-64 w-full rounded-2xl object-cover" />
            <h3 className="mt-4 font-serif text-lg text-stone-900">{role}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-stone-500">Director</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OfficeGallery() {
  return (
    <section className="bg-stone-50 px-5 py-20 lg:px-8">
      <SectionIntro eyebrow="Office Gallery" title="Designed for confidential conversations" />
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {["photo-1497366811353-6870744d04b2", "photo-1497366216548-37526070297c", "photo-1497366412874-3415097a27e7"].map((id) => (
          <img key={id} src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=85`} alt="Aureum office gallery" loading="lazy" className="h-64 w-full rounded-2xl object-cover" />
        ))}
      </div>
    </section>
  );
}

function PropertiesPage({ go, toggleFavorite, favorites, compare, toggleCompare }: { go: (page: Page) => void; toggleFavorite: (id: number) => void; favorites: number[]; compare: number[]; toggleCompare: (id: number) => void }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [city, setCity] = useState("All");
  const [maxPrice, setMaxPrice] = useState(6500000);
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    const result = properties.filter((item) => (type === "All" || item.type === type) && (city === "All" || item.city === city) && item.price <= maxPrice && `${item.name} ${item.location}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === "price-low") return [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [query, type, city, maxPrice, sort]);

  return (
    <main className="pt-20">
      <SubHero title="Search premium properties with advisor-grade filters." eyebrow="Properties" image="https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2200&q=85" />
      <section className="border-b border-stone-200 bg-white px-5 py-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 text-sm lg:grid-cols-6">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search location or project" className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 lg:col-span-2" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5"><option>All Types</option><option>Villa</option><option>Apartment</option><option>Commercial</option><option>Plot</option><option>Penthouse</option></select>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5"><option>All Cities</option><option>Dubai</option><option>Bengaluru</option><option>Mumbai</option><option>Hyderabad</option><option>Delhi</option><option>Goa</option></select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5"><option value="featured">Featured</option><option value="price-low">Price low</option><option value="price-high">Price high</option></select>
          <div className="flex gap-2">
            <button onClick={() => setView("grid")} className={`flex-1 rounded-xl border px-3 py-2.5 transition ${view === "grid" ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 bg-white hover:bg-stone-50"}`}>Grid</button>
            <button onClick={() => setView("list")} className={`flex-1 rounded-xl border px-3 py-2.5 transition ${view === "list" ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 bg-white hover:bg-stone-50"}`}>List</button>
          </div>
          <label className="flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 lg:col-span-6">
            <span className="whitespace-nowrap text-stone-500">Max Price: <span className="font-medium text-stone-900">{formatPrice(maxPrice)}</span></span>
            <input type="range" min="300000" max="6500000" step="100000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#8a6b32] md:w-1/2" />
          </label>
        </div>
      </section>
      <section className="bg-stone-50 px-5 py-12 lg:px-8">
        <div className={`mx-auto grid max-w-6xl gap-6 ${view === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}>
          {filtered.length > 0 ? filtered.map((property) => <PropertyCard key={property.id} property={property} view={view} toggleFavorite={toggleFavorite} favorite={favorites.includes(property.id)} compare={compare.includes(property.id)} toggleCompare={toggleCompare} go={go} />) : <p className="py-10 text-center text-stone-500 lg:col-span-full">No properties found matching your criteria.</p>}
        </div>
        {filtered.length > 0 && (
          <div className="mx-auto mt-10 flex max-w-6xl justify-center gap-2">
            <button className="h-10 w-10 rounded-full bg-stone-900 text-xs font-medium text-white">1</button>
            <button className="h-10 w-10 rounded-full border border-stone-200 bg-white text-xs font-medium hover:bg-stone-50">2</button>
            <button className="h-10 px-4 rounded-full border border-stone-200 bg-white text-xs font-medium hover:bg-stone-50">Next</button>
          </div>
        )}
      </section>
      <section className="border-t border-stone-200 bg-white px-5 py-6 text-xs text-stone-600 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-wrap gap-6">
          <span>Favorites: <strong>{favorites.length}</strong></span>
          <span>Compare: <strong>{compare.length}</strong></span>
          <span>Recently viewed: <em>The Aurelia Sky Villas</em></span>
        </div>
      </section>
    </main>
  );
}

function DetailsPage({ go }: { go: (page: Page) => void }) {
  const property = properties[0];
  return (
    <main className="pt-16">
      <section className="relative min-h-[600px] bg-stone-900">
        <img src={property.image} alt={property.name} className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
        <div className="relative mx-auto flex min-h-[600px] max-w-6xl flex-col justify-end px-5 pb-12 text-white lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-300">{property.status}</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">{property.name}</h1>
          <p className="mt-3 text-sm text-white/80">{property.location}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
            <span className="text-lg">{formatPrice(property.price)}</span>
            <span className="pt-0.5 opacity-60">•</span>
            <span className="pt-1">{property.beds} beds</span>
            <span className="pt-0.5 opacity-60">•</span>
            <span className="pt-1">{property.baths} baths</span>
            <span className="pt-0.5 opacity-60">•</span>
            <span className="pt-1">{property.area.toLocaleString()} sq ft</span>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-serif text-3xl text-stone-900">Property highlights</h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">A waterfront villa designed for private entertaining, everyday wellness, and resilient long-term value. Includes smart home automation, private elevator, staff suite, wellness terrace, and concierge management.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {["Private pool", "3D virtual tour", "Branded kitchen", "Club access", "EV ready", "Marina view"].map((item) => <span key={item} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-medium text-stone-700">{item}</span>)}
            </div>
          </div>
          <LeadForm title="Schedule a Private Visit" />
        </div>
      </section>
      <Showcase />
      <InfoGrid title="Specifications and amenities" items={["Floor plans: duplex 5-bedroom with family lounge and staff suite.", "Construction: imported stone, double-glazed facade, VRV cooling, acoustic walls.", "Nearby: marina promenade 4 min, international school 9 min, airport 28 min.", "Documents: brochure, title report, payment plan, and maintenance estimate available."]} />
      <section className="bg-stone-50 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-xl shadow-stone-100">
            <h2 className="font-serif text-2xl text-stone-900">Interactive map</h2>
            <div className="mt-5 flex h-64 items-center justify-center rounded-2xl bg-stone-200 text-center text-xs text-stone-600">Google Maps Integration<br />Dubai Marina, UAE</div>
          </div>
          <CalculatorPreview />
        </div>
      </section>
      <section className="sticky bottom-0 z-40 border-t border-stone-200 bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="text-sm font-semibold text-stone-900 hidden sm:block">Interested in {property.name}?</p>
          <p className="text-sm font-semibold text-stone-900 sm:hidden">{formatPrice(property.price)}</p>
          <button onClick={() => go("contact")} className="rounded-full bg-stone-900 px-6 py-2.5 text-xs font-medium text-white transition hover:bg-[#8a6b32]">Inquire Now</button>
        </div>
      </section>
    </main>
  );
}

function ServicesPage() { return <GenericPage page="Services" title="End-to-end real estate services for premium clients." image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2200&q=85" items={["Property buying with shortlist strategy and negotiation", "Selling advisory with pricing, staging, and buyer outreach", "Luxury rentals and corporate leasing", "Commercial real estate acquisition and leasing", "Legal support, title checks, and documentation", "Property valuation and portfolio review", "Investment consulting for yield and appreciation", "Interior consultation and handover management"]} />; }
function LocationsPage() { return <GenericPage page="Locations" title="Invest where infrastructure, lifestyle, and scarcity converge." image="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2200&q=85" items={["Dubai Marina: waterfront luxury and global tenant demand", "Mumbai BKC: institutional commercial depth", "Goa North: holiday home yield and limited supply", "Hyderabad Airport Corridor: plotted growth and infrastructure", "Bengaluru Golf Estate: executive residential demand", "Delhi Lutyens Edge: rarity-led appreciation", "Interactive map layer for schools, transit, hospitals, and leisure", "Trending zones ranked by absorption and price momentum"]} />; }
function BlogPage() { return <main className="pt-20"><SubHero title="Real estate intelligence for confident decisions." eyebrow="Blog and Insights" image="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2200&q=85" /><BlogPreview go={() => undefined} /><InfoGrid title="Categories, tags, and author expertise" items={["Categories: News, Investment Guides, Buying Tips, Market Trends, Finance, Interiors.", "Tags: RERA, mortgage, luxury villas, plots, rental yield, NRI investment.", "Authors: market analysts, legal partners, interior consultants, and senior advisors.", "Related posts and internal links support SEO-friendly content journeys."]} /></main>; }
function TestimonialsPage() { return <GenericPage page="Testimonials" title="Client stories that prove service, discretion, and outcomes." image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85" items={["Video testimonial: NRI family purchased a villa remotely", "5-star review: founder upgraded to a penthouse in 21 days", "Success story: commercial tenant saved 14% on long-term lease", "Before and after: underperforming rental repositioned with interiors", "Ratings across Google, referral networks, and developer channels", "Transparent timelines, visit notes, and post-sale support"]} />; }
function ContactPage() { return <main className="pt-20"><SubHero title="Speak with a senior property advisor." eyebrow="Contact" image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2200&q=85" /><section className="bg-stone-50 px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2"><LeadForm title="Tell us what you are looking for" /><div><h2 className="font-serif text-3xl text-stone-900">Advisory Desk</h2><p className="mt-4 text-sm leading-relaxed text-stone-600">Phone: +91 98765 43210<br />Email: private@aureumestates.com<br />WhatsApp: Available 9 AM - 9 PM<br />Business hours: Monday to Saturday, 10 AM - 7 PM</p><div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-stone-200 bg-white text-xs text-stone-500">Interactive Map & Office Locations</div></div></div></section></main>; }

function GenericPage({ page, title, image, items }: { page: string; title: string; image: string; items: string[] }) {
  return (
    <main className="pt-20">
      <SubHero title={title} eyebrow={page} image={image} />
      <section className="bg-white px-5 py-20 lg:px-8">
        <SectionIntro eyebrow={page} title="Premium, conversion-focused experience" copy="Each module is structured for future CMS integration, SEO landing pages, and lead generation workflows." />
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={item} className="reveal rounded-2xl border border-stone-100 bg-stone-50 p-6 shadow-sm transition hover:-translate-y-1">
              <Icon>{String(index + 1).padStart(2, "0")}</Icon>
              <p className="mt-5 text-sm leading-relaxed text-stone-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Footer({ go }: { go: (page: Page) => void }) {
  return (
    <footer className="border-t border-stone-200 bg-white px-5 py-16 text-stone-600 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 text-sm md:grid-cols-4">
        <div>
          <p className="font-serif text-2xl tracking-[0.2em] text-stone-900">AUREUM</p>
          <p className="mt-3 text-xs leading-relaxed text-stone-500">Luxury real estate advisory for developers, builders, agencies, and private buyers.</p>
        </div>
        <div>
          <h3 className="font-semibold text-stone-900">Navigation</h3>
          {nav.slice(0, 6).map((item) => <button key={item.page} onClick={() => go(item.page)} className="mt-3 block text-stone-600 hover:text-[#8a6b32]">{item.label}</button>)}
        </div>
        <div>
          <h3 className="font-semibold text-stone-900">Property Categories</h3>
          {["Villas", "Apartments", "Commercial", "Plots", "Penthouses"].map((item) => <p key={item} className="mt-3 text-stone-600">{item}</p>)}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <h3 className="font-semibold text-stone-900">Newsletter</h3>
          <input placeholder="Email address" className="mt-4 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 outline-none focus:border-[#8a6b32]" />
          <button className="mt-3 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#8a6b32]">Subscribe</button>
          <p className="mt-5 text-[10px] uppercase tracking-widest text-stone-400">RERA Aligned & Secure</p>
        </form>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-between gap-4 border-t border-stone-100 pt-6 text-[11px] uppercase tracking-wider text-stone-400">
        <p>Copyright 2026 Aureum Estates. All rights reserved.</p>
        <p>Instagram · LinkedIn · YouTube · X</p>
      </div>
    </footer>
  );
}

function FloatingTools({ go }: { go: (page: Page) => void }) {
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setPopup(true), 12000);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <>
      <button onClick={() => go("contact")} className="fixed bottom-6 right-6 z-50 rounded-full bg-[#25d366] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 transition-transform">WhatsApp</button>
      {popup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/60 p-5 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl">
            <button onClick={() => setPopup(false)} className="float-right text-xs font-medium text-stone-400 hover:text-stone-900">Close</button>
            <h2 className="font-serif text-2xl text-stone-900">Before you leave</h2>
            <p className="mt-2 text-sm text-stone-600">Get a private shortlist of luxury properties matched to your budget.</p>
            <div className="mt-5"><LeadForm title="Get My Shortlist" /></div>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  const { page, go } = useHashRoute();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compare, setCompare] = useState<number[]>([]);
  const toggleFavorite = (id: number) => setFavorites((list) => list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  const toggleCompare = (id: number) => setCompare((list) => list.includes(id) ? list.filter((item) => item !== id) : list.length < 3 ? [...list, id] : list);

  useEffect(() => {
    const meta = pageMeta[page];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement("meta"));
    description.setAttribute("name", "description");
    description.setAttribute("content", meta.description);
  }, [page]);

  useEffect(() => {
    const reveal = () => document.querySelectorAll(".reveal").forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add("is-visible"); });
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, [page]);

  return (
    <div className="min-h-screen font-sans selection:bg-[#8a6b32] selection:text-white">
      <Navbar page={page} go={go} />
      {page === "home" && <Home go={go} toggleFavorite={toggleFavorite} favorites={favorites} compare={compare} toggleCompare={toggleCompare} />}
      {page === "about" && <AboutPage />}
      {page === "properties" && <PropertiesPage go={go} toggleFavorite={toggleFavorite} favorites={favorites} compare={compare} toggleCompare={toggleCompare} />}
      {page === "details" && <DetailsPage go={go} />}
      {page === "services" && <ServicesPage />}
      {page === "locations" && <LocationsPage />}
      {page === "blog" && <BlogPage />}
      {page === "testimonials" && <TestimonialsPage />}
      {page === "contact" && <ContactPage />}
      <Footer go={go} />
      <FloatingTools go={go} />
    </div>
  );
}
