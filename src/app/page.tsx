import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./components/organizms/Navbar/Navbar";
import Link from "next/link";
import prisma from "@/lib/db/prisma";
import { buttonVariants } from "@/components/ui/button";
import { Flag } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const races = await prisma.race.findMany({
    orderBy: { id: "desc" },
    include: {
      user: true,
    },
  });
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center px-8 pt-20 gap-3">
        {session && (
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "self-end flex",
            })}
            href={"/create-event"}
          >
            <Flag className="w-4 h-4" />
            <p className="pl-2">Create Event</p>
          </Link>
        )}
        <div className="flex flex-col self-stretch items-center gap-5">
          <div className=" bg-gray-400 h-[93px] self-stretch">
            <p className="text-black h-3 w-3">{races[0].name}</p>
            <p className="text-black h-3 w-3">{races[0].circuit}</p>
            <p>{races[0].user?.name}</p>
          </div>
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
