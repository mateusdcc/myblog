import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const postsPath = path.join(process.cwd(), "posts");

const parsePost = async (filename) => {
  const source = await fs.readFile(path.join(postsPath, filename), "utf8");
  const { data, content } = matter(source);
  return {
    slug: filename.replace(/\.md$/, ""),
    title: data.title || filename.replace(/\.md$/, ""),
    desc: data.desc || "",
    date: data.date || "undated",
    markdown: content,
  };
};

export default async function getPosts() {
  const entries = await fs.readdir(postsPath);
  const filenames = entries.filter((entry) => entry.endsWith(".md"));
  const posts = await Promise.all(filenames.map(parsePost));
  return posts.sort((left, right) => right.date.localeCompare(left.date));
}
