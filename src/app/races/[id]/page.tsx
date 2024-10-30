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
import { Clock2, Settings, Table } from "lucide-react";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { getParticipantsNames } from "@/src/components/organisms/RaceResultDialog/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ParticipantBox from "@/src/components/atoms/PatricipantBox/PatricipantBox";
import { getChampionship } from "../../championships/[id]/actions";

type RacePageProps = {
  params: {
    id: string;
  };
};

const RacePage: React.FC<RacePageProps> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions);
  const race = await getRace(id);

  if (!race) redirect("/");

  const participantsNames = await getParticipantsNames(race.participants ?? []);
  const participants = Object.entries(participantsNames).map(
    ([mail, name]) => name ?? mail
  );

  return (
    <div className="flex flex-col bg-[#303030] rounded-sm p-5 h-[630px] gap-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar className="w-8 h-8">
            <AvatarImage src={race.author.image!} />
          </Avatar>
          <p className="text-sm text-white">{race.author.name}</p>
        </div>
        <div className="flex self-stretch flex-wrap justify-center items-center gap-2 bg-white text-[#303030] px-3 py-0.5 rounded-full">
          <Clock2 className="h-4 w-4" />
          <p>{race.raceHour}</p>
          <p>{dayjs(race.raceDate).format("DD MMM YYYY")}</p>
        </div>
        <div className="w-[104px] flex justify-end">
          {session?.user?.email == race.author.email && (
            <Dialog>
              <DialogTrigger asChild>
                <Settings className="text-white cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ustawienia</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col  gap-5">
                  {race.status !== RaceStatus.ENDED &&
                  race.status !== RaceStatus.ONGOING &&
                  !race.leagueId ? (
                    <InviteBar createInvite={createInviteToRace} id={race.id} />
                  ) : (
                    race.status === RaceStatus.ENDED &&
                    race.results.length == 0 &&
                    race.participants.length >= 2 && (
                      <RaceResultDialog key={race.id} raceId={race.id} />
                    )
                  )}
                  {race.status !== RaceStatus.ENDED && (
                    <EndRaceButton raceID={race.id} EndRace={endRace} />
                  )}
                  <DeleteRaceButton raceID={race.id} DeleteRace={deleteRace} />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      {race.results.length > 1 ? (
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
              {race.leagueId
                ? (await getChampionship(race.leagueId)).participants.map(
                    (u) => (
                      <ParticipantBox key={u.id}>
                        <div className="flex justify-center items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={u.user.image!} />
                          </Avatar>
                          {u.user.name}
                        </div>
                      </ParticipantBox>
                    )
                  )
                : race.results.map((person, index) => (
                    <ParticipantBox
                      key={index.toString()}
                      position={index + 1}
                      className={
                        {
                          1: "border border-yellow-200",
                          2: "border border-gray-300",
                          3: "border border-amber-700",
                        }[index + 1] || ""
                      }
                    >
                      {person}
                    </ParticipantBox>
                  ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-center items-center gap-6">
            <Badge>{race.status}</Badge>
            <p className="text-4xl text-white">{race.name}</p>
            <div className="flex">
              <Badge>{race.series}</Badge>
              <Badge>{race.circuit}</Badge>
            </div>
            <p className="text-white">{race.description}</p>
          </div>
          <div>
            <p className="text-white">Participants:</p>
            <div className="flex flex-wrap text-white gap-2">
              {race.leagueId
                ? (await getChampionship(race.leagueId)).participants.map(
                    (u) => (
                      <ParticipantBox key={u.id}>
                        <div className="flex justify-center items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={u.user.image!} />
                          </Avatar>
                          {u.user.name}
                        </div>
                      </ParticipantBox>
                    )
                  )
                : participants.map((participant, index) => (
                    <ParticipantBox key={index}>{participant}</ParticipantBox>
                  ))}
            </div>
          </div>
        </div>
      )}
      {race.leagueId && (
        <LinkButton href={`/championships/${race.leagueId}/standings`}>
          <Table width={20} height={20} /> Standings
        </LinkButton>
      )}
    </div>
  );
};

export default RacePage;
