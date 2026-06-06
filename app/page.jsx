"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const imagePath = (name) => `/images/${name}`;

const navItems = [
  ["Overview", "overview"],
  ["Exterior", "exterior"],
  ["Interior", "interior"],
  ["Zones", "zones"],
  ["Merchandising", "merchandising"],
  ["Journey", "journey"],
  ["Approval", "approval"],
];

const galleryImages = [
  { src: "hero-exterior.jpg", label: "Exterior Hero" },
  { src: "hero-interior.jpg", label: "Interior Hero" },
  { src: "exterior-entry-arch.jpg", label: "Entry Arch" },
  { src: "exterior-corner-wrap.jpg", label: "Corner Wrap" },
  { src: "exterior-glowing-vinyl-panels.jpg", label: "Glowing Vinyl Panels" },
  { src: "check-in-counter.jpg", label: "Check-In Counter" },
  { src: "baggage-claim-plush.jpg", label: "Baggage Claim Plush" },
  { src: "merch-wall.jpg", label: "Merch Wall" },
  { src: "apparel-rack.jpg", label: "Apparel Rack" },
  { src: "photo-booth.jpg", label: "Photo Booth" },
  { src: "luggage-props.jpg", label: "Luggage Props" },
  { src: "final-approval-hero.jpg", label: "Final Approval Hero" },
  { src: "gallery/check-in-counter-signage.png", label: "Check-In Counter Signage" },
  { src: "gallery/plush-check-in-counter.png", label: "Plush Check-In Counter" },
  { src: "gallery/departures-ticket-counter-wide.png", label: "Departures Ticket Counter" },
  { src: "gallery/merch-wall-tags-apparel.png", label: "Merch Wall and Apparel" },
  { src: "gallery/apparel-rack-hoodies.png", label: "Apparel Rack Hoodies" },
  { src: "gallery/baggage-claim-plush-lineup.png", label: "Baggage Claim Plush Lineup" },
  { src: "gallery/photoism-photo-booth-view.png", label: "Photo Booth View" },
  { src: "gallery/merch-shelf-plush-apparel.png", label: "Merch Shelf and Apparel" },
  { src: "gallery/plush-baggage-claim-wide.png", label: "Plush Baggage Claim Wide" },
  { src: "gallery/baggage-claim-product-display.png", label: "Baggage Claim Product Display" },
  { src: "gallery/wide-interior-plane-seating.png", label: "Wide Interior Plane Seating" },
];

const fullGalleryStart = "gallery/check-in-counter-signage.png";

const ideaCards = [
  ["Check In", "Departures counter as arrival ritual."],
  ["Explore", "A clear path through themed airport zones."],
  ["Shop", "Product moments staged as destinations."],
  ["Capture", "Photo opportunities woven into the route."],
];

const zones = [
  {
    title: "Check-In Counter",
    image: "check-in-counter.jpg",
    copy: "Pastel blue modular counters, airport-style screens, stanchions, and character moments create the arrival point.",
  },
  {
    title: "Baggage Claim",
    image: "baggage-claim-plush.jpg",
    copy: "A playful conveyor-style display turns plush characters into the central hero moment.",
  },
  {
    title: "Merch Wall",
    image: "merch-wall.jpg",
    copy: "Shelving, apparel, accessories, and boxed items are organized as a clean retail destination.",
  },
  {
    title: "Apparel Rack",
    image: "apparel-rack.jpg",
    copy: "Minimal black racks and clear signage make the merchandise feel premium and easy to browse.",
  },
  {
    title: "Photo Booth",
    image: "photo-booth.jpg",
    copy: "A branded photo moment creates a memorable fan interaction and social share opportunity.",
  },
  {
    title: "Luggage Props",
    image: "luggage-props.jpg",
    copy: "Oversized luggage and travel graphics reinforce the airport concept throughout the space.",
  },
];

const journey = [
  ["Arrive", "Guest enters the branded airport world."],
  ["Check In", "The experience begins at the departures counter."],
  ["Explore", "Guests move through themed zones."],
  ["Shop", "Merchandise is discovered along the journey."],
  ["Photo Moment", "Fans capture the experience."],
  ["Exit", "The journey ends with a memorable brand impression."],
];

function LogoMark() {
  return (
    <a className="logoMark" href="#overview" aria-label="SKZOO Airport overview">
      <img src="/logos/skzoo-airport-badge.svg" alt="SKZOO Airport Badge" />
      <span>
        <strong>SKZOO Airport</strong>
        <small>Pop-Up Store</small>
      </span>
    </a>
  );
}

function SectionHeader({ eyebrow, title, copy, align = "split" }) {
  return (
    <div className={`sectionHeader ${align}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy ? <p className="sectionCopy">{copy}</p> : null}
    </div>
  );
}

function ImageCard({ image, label, eyebrow, tall = false, onOpen }) {
  return (
    <button
      className={`imageCard ${tall ? "tall" : ""}`}
      type="button"
      onClick={() => onOpen(image, label)}
      aria-label={`Open ${label} image`}
    >
      <img src={imagePath(image)} alt={label} />
      <span className="imageCaption">
        {eyebrow ? <small>{eyebrow}</small> : null}
        <strong>{label}</strong>
      </span>
    </button>
  );
}

function CalloutChip({ children, style }) {
  return (
    <span className="calloutChip" style={style}>
      {children}
    </span>
  );
}

function CloudBackdrop() {
  const frame = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event) => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        setOffset({
          x: (event.clientX / window.innerWidth - 0.5) * 22,
          y: (event.clientY / window.innerHeight - 0.5) * 14,
        });
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      className="cloudBackdrop"
      aria-hidden="true"
      style={{
        "--cloud-x": `${offset.x}px`,
        "--cloud-y": `${offset.y}px`,
      }}
    >
      <span className="cloud cloudA" />
      <span className="cloud cloudB" />
      <span className="cloud cloudC" />
      <span className="cloud cloudD" />
      <span className="flightPath flightPathA" />
      <span className="flightPath flightPathB" />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero sectionSnap" id="overview">
      <div className="cloudLine cloudLineOne" />
      <div className="heroTop">
        <LogoMark />
        <span className="reviewBadge">Concept Visual Package / Client Review</span>
      </div>
      <div className="heroImage heroVideoFrame" aria-label="SKZOO Airport hero animation">
        <video
          src="/videos/skzoo-airport-hero.mp4"
          poster={imagePath("hero-exterior.jpg")}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
      <div className="heroTitle">
        <p>Retail Activation Concept Presentation</p>
        <h1>SKZOO Airport Pop-Up Store</h1>
      </div>
      <div className="boardingPass">
        <span>Client Review</span>
        <span>Visual Package</span>
        <span>Gate SKZ</span>
      </div>
    </section>
  );
}

function BigIdeaSection() {
  return (
    <section className="presentationSection sectionSnap" id="big-idea">
      <SectionHeader
        eyebrow="01 / The Big Idea"
        title="A retail visit reimagined as a playful airport journey."
        copy="Guests are not simply browsing merchandise. They are checking in, moving through themed zones, discovering product moments, and collecting memories throughout the experience."
      />
      <div className="ideaGrid">
        {ideaCards.map(([title, copy], index) => (
          <article className="ideaCard" key={title}>
            <span className="lineIcon" aria-hidden="true">
              {index + 1}
            </span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExteriorSection({ onOpen }) {
  return (
    <section className="presentationSection sectionSnap" id="exterior">
      <SectionHeader
        eyebrow="02 / Exterior Identity"
        title="A storefront that reads as a real branded activation."
      />
      <div className="featureStack">
        <ImageCard image="hero-exterior.jpg" label="Exterior Hero" eyebrow="Storefront" tall onOpen={onOpen} />
        <div className="threeGrid">
          <ImageCard image="exterior-entry-arch.jpg" label="Entry Arch" onOpen={onOpen} />
          <ImageCard image="exterior-corner-wrap.jpg" label="Corner Wrap" onOpen={onOpen} />
          <ImageCard image="exterior-glowing-vinyl-panels.jpg" label="Glowing Vinyl Panels" onOpen={onOpen} />
        </div>
      </div>
    </section>
  );
}

function InteriorSection({ onOpen }) {
  const callouts = [
    ["Check-In", { left: "10%", top: "18%" }],
    ["Departures", { left: "38%", top: "12%" }],
    ["Queue", { left: "24%", top: "50%" }],
    ["Baggage Claim", { left: "58%", top: "44%" }],
    ["Store", { left: "76%", top: "24%" }],
    ["Photo Booth", { left: "69%", top: "70%" }],
  ];

  return (
    <section className="presentationSection sectionSnap" id="interior">
      <SectionHeader
        eyebrow="03 / Interior Experience"
        title="The full space, the route, and the key fan moments in one view."
      />
      <div className="interiorMap">
        <button type="button" onClick={() => onOpen("wide-interior-alt.jpg", "Wide interior customer flow")} aria-label="Open wide interior rendering">
          <img src={imagePath("wide-interior-alt.jpg")} alt="Wide interior rendering with customer flow zones" />
        </button>
        {callouts.map(([label, style]) => (
          <CalloutChip key={label} style={style}>
            {label}
          </CalloutChip>
        ))}
      </div>
      <div className="motionPreview">
        <div>
          <p className="eyebrow">Motion Preview</p>
          <h3>Animated walkthrough moment</h3>
          <p>Looping concept animation for reviewing movement, atmosphere, and the airport-inspired guest experience.</p>
        </div>
        <video
          src="/videos/skzoo-airport-motion-preview.mp4"
          poster={imagePath("hero-interior.jpg")}
          autoPlay
          loop
          muted
          playsInline
          controls
          aria-label="SKZOO Airport animated walkthrough preview"
        />
      </div>
    </section>
  );
}

function ZoneBreakdown({ onOpen }) {
  return (
    <section className="presentationSection zones sectionSnap" id="zones">
      <SectionHeader eyebrow="04 / Zone Breakdown" title="Each stop has one clear purpose." />
      <div className="zoneGrid">
        {zones.map((zone, index) => (
          <article className="zoneCard" key={zone.title}>
            <ImageCard image={zone.image} label={zone.title} eyebrow={`0${index + 1}`} onOpen={onOpen} />
            <div>
              <h3>{zone.title}</h3>
              <p>{zone.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MerchandisingSection({ onOpen }) {
  return (
    <section className="presentationSection sectionSnap" id="merchandising">
      <SectionHeader
        eyebrow="05 / Merchandising"
        title="Curated Merchandise Moments"
        copy="Apparel, plush, accessories, travel goods, and collectible items are staged as part of the airport journey."
      />
      <div className="merchGrid">
        <ImageCard image="merch-wall.jpg" label="Merchandise Wall" eyebrow="Anchor" tall onOpen={onOpen} />
        <ImageCard image="merch-apparel-detail.jpg" label="Apparel" onOpen={onOpen} />
        <ImageCard image="merch-plush-detail.jpg" label="Plush" onOpen={onOpen} />
        <ImageCard image="merch-accessories-detail.jpg" label="Accessories" onOpen={onOpen} />
        <ImageCard image="merch-travel-goods-detail.jpg" label="Travel Goods" onOpen={onOpen} />
      </div>
    </section>
  );
}

function CustomerJourney() {
  return (
    <section className="presentationSection journey sectionSnap" id="journey">
      <SectionHeader eyebrow="06 / Customer Journey" title="Arrive → Check In → Explore → Shop → Photo Moment → Exit" />
      <div className="journeyRail">
        {journey.map(([title, copy], index) => (
          <article className="journeyStep" key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalApproval({ onOpen, onOpenGallery }) {
  return (
    <section className="finalSection sectionSnap" id="approval">
      <button type="button" className="finalImage" onClick={() => onOpen("final-approval-hero.jpg", "Final approval hero")} aria-label="Open final approval hero">
        <img src={imagePath("final-approval-hero.jpg")} alt="Final approval interior rendering" />
      </button>
      <div className="finalPanel">
        <p className="eyebrow">07 / Next Step</p>
        <h2>Approve visual direction for final build-out, animation, or extended render package.</h2>
        <div className="actionRow">
          <button type="button">Approve Direction</button>
          <button type="button">Request Revisions</button>
          <button type="button" onClick={onOpenGallery}>View Full Image Gallery</button>
        </div>
        <footer>SKZOO Airport Pop-Up Store · Retail Activation Concept Presentation</footer>
      </div>
    </section>
  );
}

function Lightbox({ active, onClose, gallery }) {
  const activeIndex = useMemo(() => gallery.findIndex((item) => item.src === active?.src), [active, gallery]);
  const [current, setCurrent] = useState(activeIndex);

  useEffect(() => {
    setCurrent(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setCurrent((value) => (value + 1) % gallery.length);
      if (event.key === "ArrowLeft") setCurrent((value) => (value - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, gallery.length, onClose]);

  if (!active) return null;

  const item = gallery[current] || active;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightboxClose" type="button" onClick={onClose} aria-label="Close image">
        ×
      </button>
      <button className="lightboxPrev" type="button" onClick={(event) => { event.stopPropagation(); setCurrent((value) => (value - 1 + gallery.length) % gallery.length); }} aria-label="Previous image">
        ‹
      </button>
      <img src={imagePath(item.src)} alt={item.label} onClick={(event) => event.stopPropagation()} />
      <button className="lightboxNext" type="button" onClick={(event) => { event.stopPropagation(); setCurrent((value) => (value + 1) % gallery.length); }} aria-label="Next image">
        ›
      </button>
      <p>{item.label}</p>
    </div>
  );
}

export default function Home() {
  const [activeImage, setActiveImage] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");

  const openImage = (src, label) => {
    setActiveImage({ src, label });
  };

  const openFullGallery = () => {
    const firstGalleryImage = galleryImages.find((item) => item.src === fullGalleryStart);
    setActiveImage(firstGalleryImage || galleryImages[0]);
  };

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveSection(hash);
    };

    updateFromHash();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-34% 0px -52% 0px", threshold: [0.08, 0.24, 0.42] },
    );

    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);

  return (
    <>
      <CloudBackdrop />
      <nav className="miniNav" aria-label="Presentation sections">
        <div className="navPill">
          <a className="navBrand" href="#overview" aria-label="SKZOO Airport overview">
            <img src="/logos/skzoo-airport-badge.svg" alt="SKZOO Airport Badge" />
            SKZOO Airport
          </a>
          {navItems.map(([label, id]) => (
            <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>
      </nav>
      <main>
        <HeroSection />
        <BigIdeaSection />
        <ExteriorSection onOpen={openImage} />
        <InteriorSection onOpen={openImage} />
        <ZoneBreakdown onOpen={openImage} />
        <MerchandisingSection onOpen={openImage} />
        <CustomerJourney />
        <FinalApproval onOpen={openImage} onOpenGallery={openFullGallery} />
      </main>
      <Lightbox active={activeImage} onClose={() => setActiveImage(null)} gallery={galleryImages} />
    </>
  );
}
