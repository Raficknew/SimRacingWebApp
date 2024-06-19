"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Gamepad2,
  Home,
  Settings,
  Trophy,
  TrophyIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import LoginButton from "../../atoms/LoginButtons/Loginbutton";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DropDownProps {
  session: Session | null;
}

const DropDown: React.FC<DropDownProps> = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#303030] border-[#F6F6F6]">
        {session ? (
          <>
            <DropdownMenuLabel>
              <p className="text-red-400">{session?.user?.name}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={"/"}
                className="flex justify-center text-[#F6F6F6] items-center hover:text-red-400"
              >
                <Home className="mr-2 h-4 w-4 " />
                <p className="text-red-400">Home</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={"/races"}
                className="flex justify-center text-[#F6F6F6] items-center hover:text-red-400"
              >
                <Gamepad2 className="mr-2 h-4 w-4 " />
                <p className="text-red-400">Races</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={"/profile"}
                className="flex justify-center text-[#F6F6F6] items-center hover:text-red-400"
              >
                <TrophyIcon className="mr-2 h-4 w-4 " />
                <p className="text-red-400">Championships</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={"/profile"}
                className="flex justify-center text-[#F6F6F6] items-center hover:text-red-400"
              >
                <User className="mr-2 h-4 w-4 " />
                <p className="text-red-400">Profile</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={"/settings"}
                className="flex justify-center text-[#F6F6F6] items-center hover:text-red-400"
              >
                <Settings className="mr-2 h-4 w-4 " />
                <p className="text-red-400">Settings</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : (
          ""
        )}

        <DropdownMenuItem className="flex justify-center">
          <LoginButton session={session} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
