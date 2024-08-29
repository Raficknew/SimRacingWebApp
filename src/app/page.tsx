import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "../components/organizms/Navbar/Navbar";
import prisma from "@/lib/db/prisma";
import RaceCard from "../components/molecules/RaceCard/RaceCard";
import CreateRaceButton from "../components/atoms/CreateRaceButton/CreateRaceButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const races = await prisma.race.findMany({
    orderBy: { id: "desc" },
    take: 5,
    include: {
      user: true,
    },
  });
  const invites = await prisma.invite.findMany({
    where: { userEmail: session?.user?.email! },
    include: { race: true },
  });

  // ? live events

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col px-8 pt-20 gap-3 justify-center">
        {session && (
          <div className="flex flex-col ">
            {invites.map((invite) => (
              <p key={invite.userEmail}>{invite.race.name}</p>
            ))}
            <CreateRaceButton />
          </div>
        )}
        {races.length > 0 ? (
          <div className="flex flex-col self-stretch justify-center items-center gap-5">
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
                href="/races/"
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
