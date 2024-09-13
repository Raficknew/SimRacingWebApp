import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import DeleteRaceButton from "@/src/app/races/[id]/DeleteRaceButton/DeleteRaceButton";
import { CreateInvite, DeleteRace, getRace } from "./actions";
import InviteBar from "@/src/components/molecules/InviteBar/Invitebar";
import RaceResultDialog from "@/src/components/organisms/RaceResultDialog/RaceResultDialog";
import { redirect } from "next/navigation";

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
          {session?.user?.email == race.user?.email && (
            <div>
              <DeleteRaceButton
                key={race.id}
                raceID={race.id}
                DeleteRace={DeleteRace}
              />
              {race.status !== "ended" ? (
                <InviteBar CreateInvite={CreateInvite} raceId={race.id} />
              ) : (
                race.results.length == 0 &&
                race.participants.length >= 3 && (
                  <RaceResultDialog key={race.id} raceId={race.id} />
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RacePage;
