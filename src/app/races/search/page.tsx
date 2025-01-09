import prisma from "@/lib/db/prisma";
import RaceCard from "@/src/components/molecules/RaceCard/RaceCard";
import SearchBar from "@/src/components/organisms/SearchBar/SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import { Flag } from "lucide-react";

async function RaceFind({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const session = await getServerSession(authOptions);
  const query = searchParams?.query || "";
  const races = await prisma.race.findMany({
    orderBy: { id: "desc" },
    include: {
      author: { select: { name: true, image: true } },
    },
    where: { name: { contains: query, mode: "insensitive" } },
  });

  return (
    <div>
      <div className="flex flex-col  gap-3 justify-center">
        {session && (
          <div className="flex justify-between">
            <SearchBar placeholder="Wpisz aby wyszukać wyścig..." />
            <div className="flex flex-col gap-2 max-w-[600px]"></div>
            <LinkButton
              classname="bg-white max-w-[200px]"
              href="/races/create-race"
            >
              <Flag className="w-4 h-4" />
              <p>Utwórz wyścig</p>
            </LinkButton>
          </div>
        )}
        {races.length > 0 ? (
          <div className="flex flex-col self-stretch justify-center items-center">
            <div className="flex flex-col self-stretch gap-4">
              {races.map((race) => (
                <Link href={`/races/${race.id}`} key={race.id}>
                  <RaceCard race={race} author={race.author} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          "Nie znaleziono wyścigu/ów"
        )}
      </div>
    </div>
  );
}

export default RaceFind;
