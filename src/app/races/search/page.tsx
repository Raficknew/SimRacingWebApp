import prisma from "@/lib/db/prisma";
import RaceCard from "@/src/components/molecules/RaceCard/RaceCard";
import Navbar from "@/src/components/organizms/Navbar/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "@/src/components/organizms/SearchBar/SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import CreateRaceButton from "@/src/components/atoms/CreateRaceButton/CreateRaceButton";

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
      user: true,
    },
    where: { name: { startsWith: query } },
  });

  return (
    <div className="h-screen gap-20 flex flex-col">
      <Navbar />
      <div className="flex flex-col self-stretch gap-11 p-3">
        <div className="flex justify-between">
          {" "}
          <SearchBar placeholder="Type to search for race..." />
          {session && <CreateRaceButton />}
        </div>
        <div className="flex justify-center items-center">
          {races.length > 0 ? (
            <ScrollArea className="w-[814px] h-[500px] flex self-strech items-center">
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
                  href=""
                />
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
