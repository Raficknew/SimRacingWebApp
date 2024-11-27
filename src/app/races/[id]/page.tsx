import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import DeleteRaceButton from "@/src/app/races/[id]/DeleteRaceButton/DeleteRaceButton";
import {
  changeStatus,
  createInviteToRace,
  deleteRace,
  getRace,
} from "./actions";
import RaceResultDialog from "@/src/components/organisms/RaceResultDialog/RaceResultDialog";
import { redirect } from "next/navigation";
import { RaceStatus } from "@prisma/client";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Clock2, Settings, Table } from "lucide-react";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { getParticipantsNames } from "@/src/components/organisms/RaceResultDialog/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ParticipantBox from "@/src/components/atoms/PatricipantBox/PatricipantBox";
import { getChampionship } from "../../championships/[id]/actions";
import ChangeStatusForRaceButton from "./ChangeStatusForRaceButton/ChangeStatusForRaceButton";
import InviteToRaceBar from "@/src/components/molecules/InviteToRaceBar/InviteToRaceBar";

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

  return (
    <div className="flex flex-col bg-custom-gradient rounded-sm p-5 min-h-[630px] gap-12">
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
                    <InviteToRaceBar
                      id={id}
                      createInviteToRace={createInviteToRace}
                    />
                  ) : (
                    race.status === RaceStatus.ENDED &&
                    race.results.length == 0 &&
                    race.participants.length >= 2 && (
                      <RaceResultDialog key={race.id} raceId={race.id} />
                    )
                  )}
                  {race.status !== RaceStatus.ENDED && (
                    <ChangeStatusForRaceButton
                      raceID={race.id}
                      ChangeStatus={changeStatus}
                    />
                  )}
                  <DeleteRaceButton raceID={race.id} DeleteRace={deleteRace} />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      {race.results.length > 1 ? (
        <div className="flex flex-col items-center">
          <Badge className="bg-gray-600 hover:bg-gray-700">{race.status}</Badge>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-4xl text-white">{race.name}</p>
            <Badge className="bg-rose-900 hover:bg-rose-950">
              {race.series}
            </Badge>
            <Badge className="bg-orange-900 hover:bg-orange-950">
              {race.circuit}
            </Badge>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-white">Results</p>
            <div className="grid grid-rows-2 grid-cols-2 gap-3">
              {race.results.map((person, index) =>
                person in participantsNames ? (
                  <ParticipantBox
                    key={index}
                    position={index + 1}
                    className={
                      {
                        1: "border border-yellow-200 shadow shadow-yellow-500",
                        2: "border border-gray-300",
                        3: "border border-amber-700",
                      }[index + 1] || ""
                    }
                  >
                    <div className="flex justify-center items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={
                            Object.entries(participantsNames).find(
                              (u) => u[1]?.id == person
                            )?.[1]?.image || ""
                          }
                        />
                      </Avatar>
                      {
                        Object.entries(participantsNames).find(
                          (u) => u[1]?.id == person
                        )?.[1]?.name
                      }
                    </div>
                  </ParticipantBox>
                ) : (
                  <ParticipantBox
                    key={index}
                    position={index + 1}
                    className={
                      {
                        1: "border border-yellow-200 shadow shadow-yellow-500",
                        2: "border border-gray-300",
                        3: "border border-amber-700",
                      }[index + 1] || ""
                    }
                  >
                    {person}
                  </ParticipantBox>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-center items-center gap-6">
            <Badge
              className={
                {
                  BEFORE: "bg-cyan-600 hover:bg-cyan-700",
                  ONGOING: "bg-red-600 hover:bg-red-700",
                  ENDED: "bg-gray-600 hover:bg-gray-700",
                }[race.status]
              }
            >
              {race.status}
            </Badge>
            <p className="text-4xl text-white">{race.name}</p>
            <div className="flex gap-1">
              <Badge className="bg-rose-900 hover:bg-rose-950">
                {race.series}
              </Badge>
              <Badge className="bg-orange-900 hover:bg-orange-950">
                {race.circuit}
              </Badge>
            </div>
            <p className="text-white">{race.description}</p>
          </div>
          <div>
            <p className="text-white">Participants:</p>
            <div className="flex flex-wrap text-white gap-2">
              {race.leagueId ? (
                (await getChampionship(race.leagueId)).participants.map((u) => (
                  <ParticipantBox key={u.id}>
                    <div className="flex justify-center items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={u.user.image!} />
                      </Avatar>
                      {u.user.name}
                    </div>
                  </ParticipantBox>
                ))
              ) : (
                <>
                  {Object.entries(participantsNames).map(([id, user]) => (
                    <ParticipantBox key={id}>
                      {user ? (
                        <div className="flex justify-center items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.image ?? ""} />
                          </Avatar>
                          {user.name}
                        </div>
                      ) : (
                        id
                      )}
                    </ParticipantBox>
                  ))}
                  {race.invites.map((i) => (
                    <ParticipantBox key={i.id}>
                      {i.user ? (
                        <div className="flex justify-center items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={i.user.image || ""} />
                          </Avatar>
                          {i.user.name}
                        </div>
                      ) : (
                        i.userName || i.userEmail
                      )}
                    </ParticipantBox>
                  ))}
                </>
              )}
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
