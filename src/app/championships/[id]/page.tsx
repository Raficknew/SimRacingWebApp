import RaceCard from "@/src/components/molecules/RaceCard/RaceCard";
import { getChampionship, getChampionshipAuthor } from "./actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import { Table } from "lucide-react";
import { getParticipantPoints } from "./standings/actions";
import bg from "@/src/assets/8ec323bd-ab9b-43a6-88df-51951fe44f6b.jpg";
import ParticipantWithPointsAndPosition from "@/src/components/atoms/ParticipantWithPointsAndPosition/ParticipantWithPointsAndPosition";
import LeagueTopBar from "@/src/components/organisms/LeagueTopBar/LeagueTopBar";
import CustomBackground from "@/src/components/atoms/CustomBackground/CustomBackground";

type ChampionshipProps = {
  params: {
    id: string;
  };
};

const Championship: React.FC<ChampionshipProps> = async ({
  params: { id },
}) => {
  const championship = await getChampionship(id);
  const leagueAuthor = await getChampionshipAuthor(id);
  const participants = await getParticipantPoints(id);

  if (!championship) notFound();

  const nextRace = championship.races.findLast(
    (race) => race.status === "BEFORE" || race.status === "ONGOING"
  );

  return (
    <>
      <div className="flex flex-col bg-custom-gradient rounded-sm p-5 min-h-[630px] gap-12">
        <LeagueTopBar
          leagueAuthor={leagueAuthor?.author}
          championship={championship}
        />
        {championship.races.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex flex-col gap-7 bg-black bg-opacity-10 p-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-white">Klasyfikacja kierowców</div>
                  {participants?.length
                    ? participants
                        .map((u, index) => (
                          <ParticipantWithPointsAndPosition
                            key={index}
                            name={u.name ?? ""}
                            avatar={u.image ?? ""}
                            position={index + 1}
                            points={u.points}
                          />
                        ))
                        .slice(0, 3)
                    : championship.participants
                        .map((u, index) => (
                          <ParticipantWithPointsAndPosition
                            key={index}
                            name={u.user.name ?? ""}
                            avatar={u.user.image ?? ""}
                            position={index + 1}
                            points={0}
                          />
                        ))
                        .slice(0, 3)}
                </div>
                <LinkButton
                  classname="bg-white"
                  href={`/championships/${id}/standings`}
                >
                  <Table width={20} height={20} /> <p>Standings</p>
                </LinkButton>
              </div>
              <div className="flex flex-col w-[430px]">
                {nextRace ? (
                  <div>
                    <p className="text-white">Następny wyścig:</p>
                    <div>
                      <Link key={nextRace.id} href={`/races/${nextRace?.id}`}>
                        <RaceCard author={nextRace.author} race={nextRace} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="text-white self-center">
                    Brak następnych wyścigów
                  </p>
                )}
              </div>
            </div>{" "}
          </>
        ) : (
          <div className="flex justify-center items-center text-white">
            Liga nie ma wyścigów
          </div>
        )}
        <CustomBackground bg={bg.src} />
      </div>
    </>
  );
};

export default Championship;
