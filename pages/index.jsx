// import { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
import Link from "next/link";

import getPosts from "../lib/posts";

const Blog = ({ posts }) => {
  return (
    <>
    <div className="flex flex-col items-center justify-center space-y-5 pt-5">
      <h1 className="text-3xl border-b-2 border-primary">Posts</h1>
      <ul className="flex flex-col space-y-5 flex-wrap justify-center w-screen">
        {posts.map(({ slug, title, desc, date }) => (
            <ui key={slug} className="card mr-20 ml-20 bg-base-300 hover:cursor-pointer">
            <Link href={`/${slug}`}>
              <div className="card-body">
                  <h2 className="card-title">{title}</h2>
                  <p className="text-xs">{date}</p>
                  <p>{desc}</p>
              </div>
            </Link>
          </ui>
        ))}
      </ul>
    </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: await getPosts(),
    },
  };
}

export default Blog;
