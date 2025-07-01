"use client";

import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createPost, updatePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PostFormProps } from "@/lib/types";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long!")
    .max(255, "Title must be less than 255 character long!"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long!")
    .max(255, "Descrtion must be less than 255 characters long!"),
  content: z.string().min(10, "Content must be at least 10 characters long!"),
});

type PostFormValues = z.infer<typeof postSchema>;

function PostForm({ isEditing, post }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    // mode: "onChange",
    defaultValues:
      isEditing && post
        ? {
            title: post.title,
            description: post.description,
            content: post.content,
          }
        : {
            title: "",
            description: "",
            content: "",
          },
  });

  const handleFormSubmit = async (data: PostFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        let res;

        if (isEditing && post) {
          res = await updatePost({ postId: post.id, formData });
        } else {
          res = await createPost(formData);
          console.log(res, "res from api");
        }

        if (res.success) {
          toast.success(
            isEditing
              ? "Post updated successfully"
              : "Post created successfully"
          );
          router.refresh();
          router.push("/");
        } else {
          toast.info(res.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to create post. Please try again.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter your post title"
          {...register("title")}
          disabled={isPending}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter your post description"
          className="resize-none"
          {...register("description")}
          disabled={isPending}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Post Content</Label>
        <Textarea
          id="content"
          placeholder="Enter post content"
          className="min-h-[230px] resize-none"
          {...register("content")}
          disabled={isPending}
        />
        {errors.content && (
          <p className="text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-40 cursor-pointer"
          disabled={isPending}
        >
          {isPending
            ? "Creating Post..."
            : isEditing
              ? "Update Post"
              : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
