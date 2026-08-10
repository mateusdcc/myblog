import Head from "next/head";
import Link from "next/link";
import { whoIsMe } from "../lib/who-is-me";
import { createContext, useContext, useEffect, useState } from "react";

const ShellContext = createContext({
  openWhois: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
});

export const useShell = () => useContext(ShellContext);

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function WhoisBuffer({ onClose }) {
  return (
    <div className="bio-modal-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="bio-modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whois-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="buffer-header">
          <span id="whois-title">:buffer whois-mateusdcc [FLOATING BUFFER]</span>
          <button className="close-button" type="button" onClick={onClose} aria-label="Close whois buffer">
            [X] Close
          </button>
        </header>

        <div className="buffer-body">
          <section className="bio-profile-grid" aria-label="Profile">
            <div className="bio-profile-identity">
              <img src={whoIsMe.avatar} alt={`${whoIsMe.name} profile`} className="bio-profile-icon" />
              <strong>{whoIsMe.name}</strong>
              <span>{whoIsMe.role}</span>
            </div>
            <div className="bio-profile-description">
              <p className="panel-title"># PROFILE &amp; SUMMARY</p>
              <p>
                {whoIsMe.summary} {whoIsMe.context.description}
              </p>
            </div>
          </section>

          <div className="buffer-info-grid">
            <section className="panel-block">
              <h2 className="panel-title"># WHO IS MATEUSDCC?</h2>
              <p>{whoIsMe.bio}</p>
            </section>
            <section className="panel-block">
              <h2 className="panel-title"># WHAT IS THIS WEBSITE?</h2>
              <p>{whoIsMe.context.description}</p>
            </section>
          </div>

          <section className="panel-block">
            <h2 className="panel-title"># DIRECT URL INDEX</h2>
            <div className="direct-links-grid">
              <ExternalLink href={whoIsMe.links[1].url}><span className="direct-link-card">{whoIsMe.links[1].label}<small>{whoIsMe.links[1].url.replace("https://", "")}</small></span></ExternalLink>
              <ExternalLink href={whoIsMe.links[2].url}><span className="direct-link-card">{whoIsMe.links[2].label}<small>{whoIsMe.links[2].url.replace("https://", "")}</small></span></ExternalLink>
              <ExternalLink href={whoIsMe.links[0].url}><span className="direct-link-card">{whoIsMe.links[0].label}<small>{whoIsMe.links[0].url.replace("https://", "")}</small></span></ExternalLink>
            </div>
          </section>

          <section className="panel-block">
            <h2 className="panel-title"># OPERATING PRINCIPLE</h2>
            <p>{whoIsMe.operatingPrinciple}</p>
          </section>

          <section className="panel-block">
            <h2 className="panel-title"># SEO &amp; STANDARDS</h2>
            <p>Structured with semantic HTML5 tags, JSON-LD Schema metadata, and accessibility standards for search engine indexing.</p>
          </section>
        </div>

        <footer className="buffer-footer">
          <span>Press :q or use the close control to leave this buffer.</span>
          <button type="button" onClick={onClose}>:q [close window]</button>
        </footer>
      </section>
    </div>
  );
}

export default function AppShell({ children }) {
  const [whoisOpen, setWhoisOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key === "Escape" || event.key === "q" && whoisOpen) setWhoisOpen(false);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [whoisOpen]);

  const shell = { openWhois: () => setWhoisOpen(true), drawerOpen, setDrawerOpen };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": whoIsMe.name,
    "url": whoIsMe.website,
    "image": whoIsMe.avatar,
    "sameAs": whoIsMe.links.map((link) => link.url),
    "jobTitle": whoIsMe.role
  };

  return (
    <ShellContext.Provider value={shell}>
      <Head>
        <title>MateusDCC | Unix Blog Index</title>
        <meta name="description" content="MateusDCC's Unix-inspired personal blog index featuring articles, note taking, and tech experiments." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="MateusDCC" />
        <link rel="canonical" href="https://mateusdcc.vercel.app" />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MateusDCC Blog" />
        <meta property="og:title" content="MateusDCC | Unix Blog Index" />
        <meta property="og:description" content="MateusDCC's Unix-inspired personal blog index featuring articles, note taking, and tech experiments." />
        <meta property="og:image" content="https://github.com/mateusdcc.png" />
        <meta property="og:url" content="https://mateusdcc.vercel.app" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="MateusDCC | Unix Blog Index" />
        <meta name="twitter:description" content="MateusDCC's Unix-inspired personal blog index featuring articles, note taking, and tech experiments." />
        <meta name="twitter:image" content="https://github.com/mateusdcc.png" />

        {/* JSON-LD Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </Head>
      <div className="app-layout">
        <header className="header-bar">
          <Link href="/" className="app-identity" aria-label="MateusDCC blog home">
            ~ mateusdcc.universe <span>| unix blog index</span>
          </Link>
          <nav className="header-nav" aria-label="Primary navigation">
            <Link href="/" className="nav-chip">[Blog]</Link>
            <button className="nav-chip" type="button" onClick={() => setWhoisOpen(true)}>[Me]</button>
            <ExternalLink href="https://github.com/mateusdcc"><span className="nav-chip">[GitHub]</span></ExternalLink>
          </nav>
        </header>

        <main className="main-stage">{children}</main>

        <footer className="status-bar">
          <div className="status-commands">
            <span className="mode-label">NORMAL</span>
            <button type="button" onClick={() => setWhoisOpen(true)}>:whois</button>
            <Link href="/">:buffer blog</Link>
          </div>
          <label className="status-search">
            <span className="sr-only">Search command line</span>
            <span>/</span><input type="search" placeholder="find node..." aria-label="Search command line" />
          </label>
        </footer>

        {whoisOpen && <WhoisBuffer onClose={() => setWhoisOpen(false)} />}
      </div>
    </ShellContext.Provider>
  );
}
