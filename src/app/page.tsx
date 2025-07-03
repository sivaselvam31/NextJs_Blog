import PostList from "@/components/post/postList";
import { getAllPostsFromDb } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Js 15 blog",
  description: "A blog built with Next.js 15 and Drizzle ORM with better auth",
};

export default async function Home() {
  const getAllPost = await getAllPostsFromDb();
  console.log(getAllPost, "Blog Posts from database");

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-2">All Posts</h1>
        {getAllPost.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium">No posts yet.</h2>
          </div>
        ) : (
          <PostList allPosts={getAllPost} />
        )}
      </div>
    </main>
  );
}
