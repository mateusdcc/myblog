import getPosts from "../../../lib/posts";
import { serializeProject } from "../../../lib/projects";

const allowGet = (res) => res.setHeader("Allow", "GET");
const cacheResponse = (res) => res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    allowGet(res);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const posts = await getPosts();
    cacheResponse(res);
    return res.status(200).json(posts.map(serializeProject));
  } catch {
    return res.status(500).json({ error: "Unable to load projects" });
  }
}
