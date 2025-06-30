import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { blogPosts } from "./schema";

export async function getAllPostsFromDb() {
  try {
    const allPosts = await db.query.blogPosts.findMany({
      orderBy: [desc(blogPosts.createdAt)],
      with: {
        author: true,
      },
    });
    return allPosts;
  } catch (error) {
    console.log(error, "Error fetching posts from database");
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.slug, slug),
      with: {
        author: true,
      },
    });
    return post;
  } catch (error) {
    console.error(error, "Error fetching post by slug from database");
    return null;
  }
}


