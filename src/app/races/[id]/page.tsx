import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import DeleteRaceButton from "../../../components/atoms/DeleteRaceButton/DeleteRaceButton";
import { DeleteRace } from "./actions";

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

const RacePage: React.FC<RacePageProps> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions);
  const race = await getRace(id);

  return (
    <div>
      <p>{race?.name}</p>
      <p>{race?.circuit}</p>
      <p>{race?.series}</p>
      <p>{race?.user?.email}</p>
      {session?.user?.email == race?.user?.email && (
        <DeleteRaceButton
          key={race?.id}
          raceID={race?.id!}
          DeleteRace={DeleteRace}
        />
      )}
    </div>
  );
};

export default RacePage;
