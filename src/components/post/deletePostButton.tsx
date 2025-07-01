import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DeletePostButtonProps } from "@/lib/types";

const DeletePostButton = (postId: DeletePostButtonProps) => {
  return (
    <>
      <Button variant="destructive" size="sm" className="cursor-pointer">
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </>
  );
};

export default DeletePostButton;
