import { postPath } from "./post-path";

export function serializeProject(post) {
  return {
    id: post.slug,
    title: post.title,
    content: post.markdown,
    slug: postPath(post.slug),
    date: post.date,
  };
}

export function findProject(projects, id) {
  return projects.find((project) => project.id === id) || null;
}
