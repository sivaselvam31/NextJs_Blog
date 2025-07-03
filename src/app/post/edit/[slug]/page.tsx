import Container from "@/components/layout/container";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import PostForm from "@/components/post/post-form";

async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  if (post.authorId !== session?.user?.id) {
    redirect("/");
  }

  return (
    <Container>
      <h1 className="font-bold text-4xl mt-2 mb-8 max-w-2xl">Edit Post</h1>
      <PostForm
        isEditing={true}
        post={{
          id: post.id,
          title: post.title,
          description: post.description,
          content: post.content,
          slug: post.slug,
        }}
      />
    </Container>
  );
}

export default EditPostPage;
