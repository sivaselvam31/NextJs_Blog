import { PostContentProps } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import PostDeleteButton from "@/components/post/deletePostButton";

function PostContent({ post, isAuthor }: PostContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        <CardDescription>
          By {post.author.name} - {formatDate(post.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="font-semibold">summary</h2>
        <p className="text-muted-foreground font-semibold text-xl mb-6 ml-2">
          {post.description}
        </p>
        <p className="text-lg text-justify mb-6">{post.content}</p>
      </CardContent>
      {isAuthor && (
        <CardFooter className="flex justify-end">
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/post/edit/${post.slug}`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Post
              </Link>
            </Button>

            <PostDeleteButton postId={post.id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default PostContent;
