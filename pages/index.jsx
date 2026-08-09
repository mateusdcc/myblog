import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemo, useState } from "react";
import getPosts from "../lib/posts";
import { useShell } from "../components/AppShell";

const markdownComponents = {
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
  table: ({ children }) => <div className="markdown-table-wrap"><table>{children}</table></div>,
};

function BlogTree({ posts, selectedSlug, onSelect, query, onQueryChange, onClose, onCollapse }) {
  const { drawerOpen } = useShell();
  const filteredPosts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => !needle || `${post.title} ${post.desc}`.toLowerCase().includes(needle));
  }, [posts, query]);

  return (
    <aside className={`blog-sidebar${drawerOpen ? " is-open" : ""}`} aria-label="Blog file index">
      <div className="sidebar-toolbar">
        <strong>POST INDEX</strong>
        <button type="button" className="sidebar-collapse" onClick={onCollapse} aria-label="Collapse blog index" aria-expanded="true">☰</button>
      </div>
      <div className="sidebar-mobile-header">
        <strong>BLOG INDEX</strong>
        <button type="button" onClick={onClose} aria-label="Close blog index">[X]</button>
      </div>
      <section className="panel-block tree-panel">
        <h2 className="panel-title"># FILE SEARCH</h2>
        <label className="tree-search">
          <span aria-hidden="true">/</span>
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="filter posts..." aria-label="Filter posts" />
        </label>
      </section>
      <nav className="panel-block tree-panel" aria-label="Blog posts">
        <h2 className="panel-title"># POSTS / {filteredPosts.length}</h2>
        <ul className="file-tree">
          <li className="tree-folder">▾ posts/</li>
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <button
                type="button"
                className={`tree-file${post.slug === selectedSlug ? " is-current" : ""}`}
                onClick={() => onSelect(post.slug)}
                aria-current={post.slug === selectedSlug ? "page" : undefined}
              >
                <span>├─ {post.slug}.md</span>
                <small>{post.date}</small>
              </button>
            </li>
          ))}
          {!filteredPosts.length && <li className="tree-empty">└─ no matching file</li>}
        </ul>
      </nav>
      <section className="panel-block">
        <h2 className="panel-title"># INDEX HELP</h2>
        <div className="key-value"><span>/ filter</span><span>find post</span></div>
        <div className="key-value"><span>click</span><span>read file</span></div>
        <div className="key-value"><span>:whois</span><span>about author</span></div>
      </section>
    </aside>
  );
}

function BlogReader({ post, position, total, previousPost, nextPost, onNavigate, sidebarCollapsed, onToggleSidebar }) {
  return (
    <article className="blog-reader" aria-live="polite" key={post.slug}>
      <div className="reader-toolbar">
        <button type="button" className="reader-menu-toggle" onClick={onToggleSidebar} aria-label={sidebarCollapsed ? "Expand blog index" : "Collapse blog index"} aria-expanded={!sidebarCollapsed}>☰</button>
        <span>:buffer {post.slug}.md</span>
      </div>
      <header className="post-header">
        <p className="panel-title">:read /posts/{post.slug}.md</p>
        <h1>{post.title}</h1>
        <div className="post-meta"><time dateTime={post.date}>{post.date}</time><span>entry {position} of {total}</span></div>
        {post.desc && <p className="post-description">{post.desc}</p>}
      </header>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.markdown}</ReactMarkdown>
      </div>
      <footer className="post-footer post-navigation" aria-label="Post navigation">
        <button type="button" onClick={() => previousPost && onNavigate(previousPost.slug)} disabled={!previousPost}>
          <span>← previous</span><small>{previousPost?.title || "start of index"}</small>
        </button>
        <Link href={`/${post.slug}`}>:open page</Link>
        <button type="button" onClick={() => nextPost && onNavigate(nextPost.slug)} disabled={!nextPost}>
          <span>next →</span><small>{nextPost?.title || "end of index"}</small>
        </button>
      </footer>
    </article>
  );
}

export default function Blog({ posts }) {
  const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug || "");
  const [query, setQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const { drawerOpen, setDrawerOpen } = useShell();
  const resizeSidebar = (width) => setSidebarWidth(Math.min(Math.max(width, 220), Math.min(window.innerWidth * 0.45, 560)));
  const resizeWithKeys = (event) => {
    const change = event.key === "ArrowRight" ? 16 : event.key === "ArrowLeft" ? -16 : 0;
    if (!change) return;
    event.preventDefault();
    resizeSidebar(sidebarWidth + change);
  };
  const selectedPost = posts.find((post) => post.slug === selectedSlug) || posts[0];
  const selectedIndex = posts.findIndex((post) => post.slug === selectedPost?.slug);
  const previousPost = posts[selectedIndex - 1] || null;
  const nextPost = posts[selectedIndex + 1] || null;

  if (!selectedPost) return null;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "MateusDCC Blog",
    "url": "https://mateusdcc.vercel.app",
    "description": "MateusDCC personal engineering blog and technical notes index.",
    "publisher": {
      "@type": "Person",
      "name": "MateusDCC",
      "image": "https://github.com/mateusdcc.png"
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.desc,
      "datePublished": post.date,
      "url": `https://mateusdcc.vercel.app/${post.slug}`
    }))
  };

  return (
    <>
      <Head>
        <title>{selectedPost ? `${selectedPost.title} | MateusDCC Blog` : "MateusDCC Blog"}</title>
        <meta name="description" content={selectedPost?.desc || "MateusDCC personal engineering blog and technical notes index."} />
        <link rel="canonical" href={`https://mateusdcc.vercel.app/${selectedPost.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${selectedPost.title} | MateusDCC Blog`} />
        <meta property="og:description" content={selectedPost.desc || "MateusDCC technical post."} />
        <meta property="og:url" content={`https://mateusdcc.vercel.app/${selectedPost.slug}`} />
        <meta property="og:image" content="https://github.com/mateusdcc.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${selectedPost.title} | MateusDCC Blog`} />
        <meta name="twitter:description" content={selectedPost.desc || "MateusDCC technical post."} />
        <meta name="twitter:image" content="https://github.com/mateusdcc.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </Head>
      <section
        className={`blog-layout${sidebarCollapsed ? " is-sidebar-collapsed" : ""}`}
      style={{ "--sidebar-width": `${sidebarWidth}px` }}
      aria-label="MateusDCC blog"
    >
      <BlogTree
        posts={posts}
        selectedSlug={selectedSlug}
        onSelect={(slug) => { setSelectedSlug(slug); setDrawerOpen(false); }}
        query={query}
        onQueryChange={setQuery}
        onClose={() => setDrawerOpen(false)}
        onCollapse={() => setSidebarCollapsed(true)}
      />
      <div
        className="sidebar-resize-handle"
        role="separator"
        aria-label="Resize blog index"
        aria-orientation="vertical"
        aria-valuemin={220}
        aria-valuemax={560}
        aria-valuenow={Math.round(sidebarWidth)}
        tabIndex={0}
        onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) resizeSidebar(event.clientX);
        }}
        onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
        onKeyDown={resizeWithKeys}
      />
      <BlogReader
        post={selectedPost}
        position={selectedIndex + 1}
        total={posts.length}
        previousPost={previousPost}
        nextPost={nextPost}
        onNavigate={setSelectedSlug}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((collapsed) => !collapsed)}
      />
      <button className="drawer-toggle" type="button" onClick={() => setDrawerOpen(true)}>:files [{posts.length}]</button>
      {drawerOpen && <div className="drawer-scrim" onClick={() => setDrawerOpen(false)} aria-hidden="true" />}
    </section>
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: await getPosts() } };
}
