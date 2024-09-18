import RaceCard from "@/src/components/molecules/RaceCard/RaceCard";
import { getChampionship } from "./actions";
import Link from "next/link";
import { notFound } from "next/navigation";

type ChampionshipProps = {
  params: {
    id: string;
  };
};

const Championship: React.FC<ChampionshipProps> = async ({
  params: { id },
}) => {
  const championship = await getChampionship(id);
  if (!championship) notFound();
  return (
    <div>
      <p>Nadchodzące wyścigi: </p>
      {championship.races.map((race) => (
        <Link key={race.id} href={`/races/${race.id}`}>
          <RaceCard author={race.user} race={race} />
        </Link>
      ))}
    </div>
  );
};

export default Championship;
