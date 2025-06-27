"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { User } from "better-auth";
import Link from "next/link";
import { LogOut, PenSquare, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

interface UserMenuProps {
  user: User;
}

function UserMenu({ user }: UserMenuProps) {
  const [isLoading, setIsLoadnig] = useState(false);
  const router = useRouter();

  const getFirstLetterFromUserName = (userName: string) => {
    return userName
      .split(" ")
      .map((word) => word[0])
      .join()
      .toUpperCase();
  };

  const handleLogout = async () => {
    setIsLoadnig(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("You have been succefully Logged out");
            router.refresh();
          },
        },
      });
    } catch (error) {
      toast.error("something went wrong! Please try again")
    } finally {
      setIsLoadnig(false)
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="relative h-8 w-8 rounded-full cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="font-semibold text-lg">
              {getFirstLetterFromUserName(user?.name) || "User"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/post/create">
            <PenSquare className="mr-2 h-4 w-4" />
            <span>Create Post</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoading}
          className="cursor-pointer"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>{isLoading ? "LoggingOut..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
