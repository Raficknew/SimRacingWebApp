import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
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
      author: { select: { name: true, image: true } },
    },
  });

  return (
    <div className="flex flex-col gap-3 justify-center">
      {session && (
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 max-w-[600px]"></div>
          <div className="flex self-end">
            <LinkButton classname="bg-white px-5" href="/races/create-race">
              <Flag className="w-4 h-4" />
              <p>Utwórz wyścig</p>
            </LinkButton>
          </div>
        </div>
      )}
      {races.length > 0 ? (
        <div className="flex flex-col self-stretch justify-center items-center gap-5">
          {races.map((race) => (
            <Link
              href={`/races/${race.id}`}
              key={race.id}
              className="self-stretch"
            >
              <RaceCard race={race} author={race.author} />
            </Link>
          ))}
        </div>
      ) : (
        "No races yet"
      )}
    </div>
  );
}
