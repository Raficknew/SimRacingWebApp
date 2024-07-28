import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./components/organizms/Navbar/Navbar";
import Link from "next/link";
import prisma from "@/lib/db/prisma";
import { buttonVariants } from "@/components/ui/button";
import { Flag } from "lucide-react";
import RaceCard from "./components/molecules/RaceCard/RaceCard";

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
      <div className="flex flex-col px-8 pt-20 gap-3">
        {session && (
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "self-end flex",
            })}
            href={"/races/create-race"}
          >
            <Flag className="w-4 h-4" />
            <p className="pl-2">Create Race</p>
          </Link>
        )}
        {races.length > 0 ? (
          <div className="flex flex-col self-stretch items-center gap-5">
            {races.map((race) => (
              <RaceCard
                key={race.id}
                id={race.id}
                author={race.user?.name!}
                authorPicture={race.user?.image!}
                name={race.name}
                circuit={race.circuit}
                series={race.series}
                hour={race.raceHour}
                date={race.raceDate}
              />
            ))}
          </div>
        ) : (
          "No races yet"
        )}
      </div>
    </div>
  );
}
