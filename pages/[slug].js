import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import getPosts from "../lib/posts";
import { normalizePostSlug, postPath } from "../lib/post-path";

const markdownComponents = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
  table: ({ children }) => <div className="markdown-table-wrap"><table>{children}</table></div>,
};

export default function Post({ slug, title, date, desc, markdown, posts }) {
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  const previousPost = posts[currentIndex - 1] || null;
  const nextPost = posts[currentIndex + 1] || null;

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": desc || title,
    "datePublished": date,
    "author": {
      "@type": "Person",
      "name": "MateusDCC",
      "image": "https://github.com/mateusdcc.png",
      "url": "https://mateusdcc.vercel.app"
    },
    "url": `https://mateusdcc.vercel.app${postPath(slug)}`,
    "mainEntityOfPage": `https://mateusdcc.vercel.app${postPath(slug)}`
  };

  return (
    <>
      <Head>
        <title>{title} | MateusDCC Blog</title>
        <meta name="description" content={desc || title} />
        <link rel="canonical" href={`https://mateusdcc.vercel.app${postPath(slug)}`} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} | MateusDCC Blog`} />
        <meta property="og:description" content={desc || title} />
        <meta property="og:url" content={`https://mateusdcc.vercel.app${postPath(slug)}`} />
        <meta property="og:image" content="https://github.com/mateusdcc.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title} | MateusDCC Blog`} />
        <meta name="twitter:description" content={desc || title} />
        <meta name="twitter:image" content="https://github.com/mateusdcc.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
        />
      </Head>
      <section className="article-grid" aria-label="Post reader">
      <article className="post-reader" key={slug}>
        <header className="post-header">
          <p className="panel-title">:read /posts/{title.toLowerCase().replaceAll(" ", "-")}</p>
          <h1>{title}</h1>
          <div className="post-meta"><time dateTime={date}>{date}</time><span>markdown / readonly</span></div>
          {desc && <p className="post-description">{desc}</p>}
        </header>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{markdown}</ReactMarkdown>
        </div>
        <footer className="post-footer post-navigation" aria-label="Post navigation">
          {previousPost ? (
            <Link href={postPath(previousPost.slug)}><span>← previous</span><small>{previousPost.title}</small></Link>
          ) : <span className="post-nav-disabled"><span>← previous</span><small>start of index</small></span>}
          <Link href="/">:buffer blog</Link>
          {nextPost ? (
            <Link href={postPath(nextPost.slug)}><span>next →</span><small>{nextPost.title}</small></Link>
          ) : <span className="post-nav-disabled"><span>next →</span><small>end of index</small></span>}
        </footer>
      </article>

      <aside className="article-sidebar" aria-label="Article index">
        <section className="panel-block">
          <h2 className="panel-title"># CURRENT BUFFER</h2>
          <div className="panel-card">
            <strong>{title}</strong>
            <span>{date}</span>
            <span>post / loaded</span>
          </div>
        </section>
        <nav className="panel-block" aria-label="Other posts">
          <h2 className="panel-title"># OTHER BUFFERS</h2>
          <div className="post-index-list">
            {posts.filter((post) => post.title !== title).map((post) => (
              <Link href={postPath(post.slug)} className="post-index-item" key={post.slug}>
                <span>{post.title}</span><small>{post.date}</small>
              </Link>
            ))}
          </div>
        </nav>
        <section className="panel-block">
          <h2 className="panel-title"># COMMANDS</h2>
          <Link href="/" className="inline-command">:q return to index</Link>
        </section>
      </aside>
    </section>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.flatMap(({ slug }) => [
    { params: { slug } },
    { params: { slug: postPath(slug).slice(1) } },
  ]);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const posts = await getPosts();
  const post = posts.find((item) => item.slug === normalizePostSlug(params.slug));
  return { props: { ...post, posts } };
}
