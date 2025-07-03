"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DeletePostButtonProps } from "@/lib/types";
import { useState } from "react";
import { deletePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await deletePost(postId);
      if (res.message) {
        toast.success(res.message);
        router.push("/");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.info(
        error instanceof Error
          ? error.message
          : String(error) +
              ". An error occured while deleting the Post! Please try again"
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        variant="destructive"
        size="sm"
        className="cursor-pointer"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        {isDeleting ? "Deleting the Post..." : "Delete"}
      </Button>
    </>
  );
};

export default DeletePostButton;
