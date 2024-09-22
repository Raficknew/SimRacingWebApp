import RaceCard from "@/src/components/molecules/RaceCard/RaceCard";
import { getChampionship, getChampionshipAuthor } from "./actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import { Flag } from "lucide-react";

type ChampionshipProps = {
  params: {
    id: string;
  };
};

const Championship: React.FC<ChampionshipProps> = async ({
  params: { id },
}) => {
  const championship = await getChampionship(id);
  const author = await getChampionshipAuthor(id);

  if (!championship) notFound();

  const session = await getServerSession(authOptions);
  return (
    <div>
      {author && session && author.user.email === session.user?.email && (
        <LinkButton href={`/championships/${id}/create-race`}>
          <Flag className="w-4 h-4" />
          <p>Create Race</p>
        </LinkButton>
      )}
      {championship.races.length > 0 ? (
        <div>
          {championship.races.length === 1 ? (
            <p>Nadchodzący wyścig: </p>
          ) : (
            <p>Nadchodzące wyścigi:</p>
          )}
          {championship.races.map((race) => (
            <Link key={race.id} href={`/races/${race.id}`}>
              <RaceCard author={race.user} race={race} />
            </Link>
          ))}
        </div>
      ) : (
        "Liga nie ma wyścigów"
      )}
    </div>
  );
};

export default Championship;
