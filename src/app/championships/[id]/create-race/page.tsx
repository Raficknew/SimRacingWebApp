import RaceForm from "@/src/components/organisms/RaceForm/RaceForm";
import { createLeagueRace } from "./actions";
import bg from "@/src/assets/8ec323bd-ab9b-43a6-88df-51951fe44f6b.jpg";
import CustomBackground from "@/src/components/atoms/CustomBackground/CustomBackground";

interface CreateLeagueRacePageProps {
  params: {
    id: string;
  };
}

const CreateLeagueRacePage: React.FC<CreateLeagueRacePageProps> = async ({
  params: { id },
}) => {
  return (
    <>
      <RaceForm leagueId={id} createRace={createLeagueRace} />;
      <CustomBackground bg={bg.src} />
    </>
  );
};

export default CreateLeagueRacePage;
