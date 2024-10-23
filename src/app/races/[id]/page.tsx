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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Clock2, Settings } from "lucide-react";
import dayjs from "dayjs";

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
    <div className="bg-white rounded-sm p-5 h-[630px]">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={race.author.image} />
              </Avatar>
              <p className="text-sm">{race.author.name}</p>
            </div>
            <div className="flex self-stretch flex-wrap justify-center items-center gap-2 bg-black text-white px-3 py-0.5 rounded-full">
              <Clock2 className="h-4 w-4" />
              <p>{race.raceHour}</p>
              <p>{dayjs(race.raceDate).format("DD MMM YYYY")}</p>
            </div>
            <div className="w-[104px] flex justify-end">
              {" "}
              <Settings />
            </div>
          </div>
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
