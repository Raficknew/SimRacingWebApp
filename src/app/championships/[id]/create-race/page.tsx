import RaceForm from "@/src/components/organisms/RaceForm/RaceForm";
import { CreateLeagueRace } from "./actions";

interface CreateLeagueRacePageProps {
  params: {
    id: string;
  };
}

const CreateLeagueRacePage: React.FC<CreateLeagueRacePageProps> = async ({
  params: { id },
}) => {
  return <RaceForm leagueId={id} createRace={CreateLeagueRace} />;
};

export default CreateLeagueRacePage;
