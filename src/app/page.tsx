import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "@/src/components/organisms/Navbar/Navbar";
import prisma from "@/lib/db/prisma";
import RaceCard from "@/src/components/molecules/RaceCard/RaceCard";
import Link from "next/link";
import LinkButton from "../components/atoms/LinkButton/LinkButton";
import { Flag } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const races = await prisma.race.findMany({
    orderBy: { id: "desc" },
    take: 5,
    include: {
      user: { select: { name: true, image: true } },
    },
  });

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col px-8 pt-20 gap-3 justify-center">
        {session && (
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 max-w-[600px]"></div>
            <LinkButton href="/races/create-race">
              <Flag className="w-4 h-4" />
              <p>Create Race</p>
            </LinkButton>
          </div>
        )}
        {races.length > 0 ? (
          <div className="flex flex-col self-stretch justify-center items-center gap-5">
            {races.map((race) => (
              <Link
                href={`/races/${race.id}`}
                key={race.id}
                className="self-stretch bg-slate-400 p-1 rounded-lg text-white max-w-[814px] min-w-[200px]"
              >
                <RaceCard race={race} author={race.user} />
              </Link>
            ))}
          </div>
        ) : (
          "No races yet"
        )}
      </div>
    </div>
  );
}
