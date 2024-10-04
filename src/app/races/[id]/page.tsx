import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import DeleteRaceButton from "@/src/app/races/[id]/DeleteRaceButton/DeleteRaceButton";
import { createInviteToRace, deleteRace, endRace, getRace } from "./actions";
import InviteBar from "@/src/components/molecules/InviteBar/Invitebar";
import RaceResultDialog from "@/src/components/organisms/RaceResultDialog/RaceResultDialog";
import { redirect } from "next/navigation";
import { RaceStatus } from "@prisma/client";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import EndRaceButton from "./EndRaceButton/EndRaceButton";

type RacePageProps = {
  params: {
    id: string;
  };
};

const RacePage: React.FC<RacePageProps> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions);
  const race = await getRace(id);

  if (!race) redirect("/");

  return (
    <div>
      {race.results.length > 1 ? (
        <div>
          <p>Wyścig się zakończył</p>
          {race.results.map((person, index) => (
            <p key={index.toString()}>
              {index + 1} {person}
            </p>
          ))}
        </div>
      ) : (
        <>
          <p>{race.name}</p>
          <p>{race.circuit}</p>
          <p>{race.series}</p>
          {session?.user?.email == race.author.email && (
            <div>
              <DeleteRaceButton raceID={race.id} DeleteRace={deleteRace} />
              {race.status !== RaceStatus.ENDED && (
                <EndRaceButton raceID={race.id} EndRace={endRace} />
              )}
              {race.status !== RaceStatus.ENDED && !race.leagueId ? (
                <InviteBar createInvite={createInviteToRace} id={race.id} />
              ) : (
                race.status === RaceStatus.ENDED &&
                race.results.length == 0 &&
                race.participants.length >= 2 && (
                  <RaceResultDialog key={race.id} raceId={race.id} />
                )
              )}
            </div>
          )}
        </>
      )}
      {race.leagueId && (
        <LinkButton href={`/championships/${race.leagueId}/standings`}>
          Standings
        </LinkButton>
      )}
    </div>
  );
};

export default RacePage;
