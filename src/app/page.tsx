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
            href={"/create-race"}
          >
            <Flag className="w-4 h-4" />
            <p className="pl-2">Create Race</p>
          </Link>
        )}
        {races.length > 0 ? (
          <div className="flex flex-col self-stretch items-center gap-5">
            {races.map((race) => (
              <div key={race.id} className=" bg-gray-400 h-[93px] self-stretch">
                <p className="text-black h-3 w-3">{race.name}</p>
                <p className="text-black h-3 w-3">{race.circuit}</p>
                <p>{race.user?.name}</p>
              </div>
            ))}
          </div>
        ) : (
          "No races yet"
        )}
      </div>
    </div>
  );
}
