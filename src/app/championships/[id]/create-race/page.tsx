import RaceForm from "@/src/components/organisms/RaceForm/RaceForm";
import { createLeagueRace } from "./actions";
import bg from "@/src/assets/8ec323bd-ab9b-43a6-88df-51951fe44f6b.jpg";

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
      <div>
        <div
          className="absolute top-0 left-0 z-[-2] min-h-screen w-full bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute top-0 left-0 z-[-1] min-h-screen w-full bg-cover bg-center flex justify-center items-center bg-black opacity-30"></div>
      </div>
    </>
  );
};

export default CreateLeagueRacePage;
