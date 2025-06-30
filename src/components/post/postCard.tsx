import { PostCardProps } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Link href={`/post/${post.slug}`} className="cursor-auto">
          <CardTitle className="inline text-2xl cursor-pointer hover:underline">{post.title}</CardTitle>
        </Link>
        <CardDescription className="text-gray-500">{formatDate(post.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {post.description}
        </p>
      </CardContent>
    </Card>
  );
}

export default PostCard;
