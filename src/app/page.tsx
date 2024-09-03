import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "../components/organizms/Navbar/Navbar";
import prisma from "@/lib/db/prisma";
import RaceCard from "../components/molecules/RaceCard/RaceCard";
import CreateRaceButton from "../components/atoms/CreateRaceButton/CreateRaceButton";
import Invite from "../components/atoms/Invite/Invite";
import { AcceptInvite, DeleteInvite } from "./actions";

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
          <div className="flex flex-col">
            <div className="flex flex-col gap-2 max-w-[600px]">
              {invites.map((invite) => (
                <Invite
                  key={invite.userEmail}
                  inviteId={invite.id}
                  raceName={invite.race.name}
                  raceId={invite.raceId}
                  userEmail={invite.userEmail}
                  AcceptInvite={AcceptInvite}
                  DeleteInvite={DeleteInvite}
                />
              ))}
            </div>
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
