"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function CreatePost(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: " You must be logged in to create a Post!",
      };
    }

    //get form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    //second step of form validation
    if (!title || !description || !content) {
      return {
        success: false,
        message: "All fields are required!",
      };
    }

    //create a slug from post title
    const slug = slugify(title);

    //check if the slug already exists
    const existingPost = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message:
          "A post with this title already exists! please try a different title.",
      };
    }

    //create a new post
    const [newPost] = await db
      .insert(blogPosts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    //revalidate the home page to get the latest post
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post created successfully!",
      slug,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "failed to create post",
    };
  }
}
