"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Gamepad2, Home, Settings, TrophyIcon, User } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginButton from "@/src/components/atoms/LoginButtons/Loginbutton";

interface DropDownProps {
  session: Session | null;
}

const DropDown: React.FC<DropDownProps> = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {session?.user?.image && <AvatarImage src={session.user.image} />}
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#303030] border-[#F6F6F6]">
        {session ? (
          <>
            <DropdownMenuLabel>
              <p className="text-white">{session?.user?.name}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="*:text-[#F6F6F6] *:hover:text-red-400">
              <Link href={"/"} className="flex justify-center items-center">
                <Home className="mr-2 h-4 w-4 " />
                <p>Home</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="*:text-[#F6F6F6] *:hover:text-red-400">
              <Link
                href={"/profile"}
                className="flex justify-center items-center"
              >
                <User className="mr-2 h-4 w-4 " />
                <p>Profile</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="*:text-[#F6F6F6] *:hover:text-red-400">
              <Link
                href={"/profile/settings"}
                className="flex justify-center items-center"
              >
                <Settings className="mr-2 h-4 w-4 " />
                <p>Settings</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : (
          ""
        )}

        <DropdownMenuItem className="flex justify-center *:text-[#F6F6F6] *:hover:text-red-400">
          <LoginButton session={session} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
