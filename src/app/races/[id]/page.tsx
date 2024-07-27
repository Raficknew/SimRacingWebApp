import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

interface RacePageProps {
  params: {
    id: string;
  };
}

const getRace = cache(async (id: string) => {
  const race = await prisma.race.findUnique({ where: { id } });
  if (!race) notFound;
  return race;
});

const RacePage: React.FC<RacePageProps> = async ({ params: { id } }) => {
  const race = await getRace(id);

  return (
    <div>
      <p>{race?.name}</p>
    </div>
  );
};

export default RacePage;
