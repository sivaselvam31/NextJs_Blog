import { getPostBySlug } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import PostContent from "@/components/post/postContent";

async function PostDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!post) {
    notFound();
  }

  //getting author inforamtion using session
  const isAuthor = session?.user?.id === post.author.id;

  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <PostContent />
      </div>
    </main>
  )
}

export default PostDetailsPage;
