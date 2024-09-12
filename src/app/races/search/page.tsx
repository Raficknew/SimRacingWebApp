import prisma from "@/lib/db/prisma";
import RaceCard from "@/src/components/molecules/RaceCard/RaceCard";
import Navbar from "@/src/components/organisms/Navbar/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    page?: string;
  };
}) {
  const session = await getServerSession(authOptions);
  const query = searchParams?.query || "";
  const races = await prisma.race.findMany({
    orderBy: { id: "desc" },
    include: {
      user: { select: { name: true, image: true } },
    },
    where: { name: { contains: query, mode: "insensitive" } },
  });

  return (
    <div className="h-screen gap-20 flex flex-col">
      <Navbar />
      <div className="flex flex-col self-stretch gap-11 p-3">
        <div className="flex justify-between">
          <SearchBar placeholder="Type to search for race..." />
          {session && (
            <LinkButton
              title="Create Race"
              icon={<Flag className="w-4 h-4" />}
              href="/races/create-race"
            />
          )}
        </div>
        <div className="flex justify-center items-center">
          {races.length > 0 ? (
            <ScrollArea className="w-[814px] h-[500px] flex self-strech items-center">
              {races.map((race) => (
                <Link
                  href={"/races/" + race.id}
                  key={race.id}
                  className="self-stretch bg-slate-400 p-1 rounded-lg text-white max-w-[814px] min-w-[200px]"
                >
                  <RaceCard
                    race={race}
                    author={race.user?.name ?? ""}
                    authorPicture={race.user?.image ?? ""}
                  />
                </Link>
              ))}
            </ScrollArea>
          ) : (
            "Nie znaleziono wyścigu"
          )}
        </div>
      </div>
    </div>
  );
}

export default RaceFind;
