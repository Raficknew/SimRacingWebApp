import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginButton from "./components/atoms/LoginButtons/Loginbutton";
import Navbar from "./components/organizms/Navbar/Navbar";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Flag } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center px-8 pt-20 gap-3">
        <Link
          className={buttonVariants({
            variant: "outline",
            className: "self-end flex",
          })}
          href={""}
        >
          <Flag className="w-4 h-4" />
          <p className="pl-2">Create Event</p>
        </Link>
        <div className="flex flex-col self-stretch items-center gap-5">
          <div className="flex bg-gray-400 h-[93px] self-stretch"></div>
          <div className="flex bg-gray-400 h-[93px] self-stretch"></div>
          <div className="flex bg-gray-400 h-[93px] self-stretch"></div>
          <div className="flex bg-gray-400 h-[93px] self-stretch"></div>
          <div className="flex bg-gray-400 h-[93px] self-stretch"></div>
          <div className="flex bg-gray-400 h-[93px] self-stretch"></div>
        </div>
      </div>
    </div>
  );
}
