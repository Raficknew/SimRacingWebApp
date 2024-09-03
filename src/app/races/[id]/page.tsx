import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import DeleteRaceButton from "../../../components/atoms/DeleteRaceButton/DeleteRaceButton";
import { CreateInvite, DeleteRace } from "./actions";
import InviteBar from "@/src/components/molecules/InviteBar/Invitebar";

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
      <p>{race?.name}</p>
      <p>{race?.circuit}</p>
      <p>{race?.series}</p>
      <p>{race?.user?.email}</p>
      <div>
        {race?.participants.map((p) => (
          <p key={""}>{getParticipant(p)}</p>
        ))}
      </div>
      {session?.user?.email == race?.user?.email && (
        <div>
          <DeleteRaceButton
            key={race?.id}
            raceID={race?.id!}
            DeleteRace={DeleteRace}
          />
          <InviteBar CreateInvite={CreateInvite} raceId={race?.id!} />
        </div>
      )}
    </div>
  );
};

export default RacePage;
