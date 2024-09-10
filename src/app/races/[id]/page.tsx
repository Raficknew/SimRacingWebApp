import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import DeleteRaceButton from "../../../components/atoms/DeleteRaceButton/DeleteRaceButton";
import { CreateInvite, DeleteRace } from "./actions";
import InviteBar from "@/src/components/molecules/InviteBar/Invitebar";
import RaceResultDialog from "@/src/components/organizms/RaceResultDialog/RaceResultDialog";

type RacePageProps = {
  params: {
    id: string;
  };
};

const getRace = cache(async (id: string) => {
  const race = await prisma.race.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!race) notFound;
  return race;
});

const getParticipant = cache(async (mail: string) => {
  const user = await prisma.user.findUnique({ where: { email: mail } });

  if (!user) notFound;

  const participant = user?.name;
  return participant;
});

const RacePage: React.FC<RacePageProps> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions);
  const race = await getRace(id);

  return (
    <div>
      {race?.results.length! > 1 ? (
        <div>
          <p>Wyścig się zakończył</p>
          {race?.results.map((person, index) => (
            <p key={index.toString()}>
              {index + 1} {person}
            </p>
          ))}
        </div>
      ) : (
        <>
          <p>{race?.name}</p>
          <p>{race?.circuit}</p>
          <p>{race?.series}</p>
          <p>{race?.user?.email}</p>
          {session?.user?.email == race?.user?.email && (
            <div>
              <DeleteRaceButton
                key={race?.id}
                raceID={race?.id!}
                DeleteRace={DeleteRace}
              />
              {race?.status !== "ended" ? (
                <InviteBar CreateInvite={CreateInvite} raceId={race?.id!} />
              ) : (
                race.results.length == 0 && (
                  <RaceResultDialog key={race.id} raceId={race.id} />
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RacePage;
