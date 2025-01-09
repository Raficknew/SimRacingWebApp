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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Clock2, Settings, Trophy } from "lucide-react";
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
import { getChampionship } from "../../championships/[id]/actions";
import ChangeStatusForRaceButton from "./ChangeStatusForRaceButton/ChangeStatusForRaceButton";
import InviteToRaceBar from "@/src/components/molecules/InviteToRaceBar/InviteToRaceBar";
import DeleteParticipantFromRaceDialog from "@/src/components/organisms/DeleteParticipantFromRaceDialog/DeleteParticipantFromRaceDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Participant from "@/src/components/atoms/Patricipant/Patricipant";
import ParticipantWithPosition from "@/src/components/atoms/ParticipantWithPosition/ParticipantWithPosition";
import "dayjs/locale/pl";

type RacePageProps = {
  params: {
    id: string;
  };
};

const RacePage: React.FC<RacePageProps> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions);
  const race = await getRace(id);

  if (!race) redirect("/");

  const existingParticipants = race.invites.length
    ? race.participants.concat(
        race.invites.filter((i) => i.user).map((i) => i.user.id)
      )
    : race.participants;

  const participantsNames = await getParticipantsNames(
    existingParticipants ?? []
  );

  dayjs.locale("pl");
  return (
    <div className="flex flex-col bg-custom-gradient rounded-sm p-8 min-h-[630px] gap-20">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={race.author.image ?? ""} />
            </Avatar>
            <p className="text-sm text-white">{race.author.name}</p>
          </div>
          <div className="flex self-stretch flex-wrap justify-center items-center gap-2 text-white px-3 py-0.5 rounded-full">
            <Clock2 className="size-6" />
            <p>{race.raceHour}</p>
            <p>{dayjs(race.raceDate).format("DD MMMM YYYY")}</p>
          </div>
          <div className="w-[104px] flex justify-end">
            {session?.user?.email == race.author.email && (
              <Dialog>
                <DialogTrigger asChild>
                  <Settings className="text-white cursor-pointer size-6" />
                </DialogTrigger>
                <DialogContent>
                  <Tabs defaultValue="general" className="w-[400px]">
                    <DialogHeader>
                      <DialogTitle>
                        <TabsList className="bg-white">
                          <TabsTrigger value="general">Ogólne</TabsTrigger>
                          {race.status !== RaceStatus.ENDED && (
                            <TabsTrigger value="drivers">
                              Zarządzaj kierowcami
                            </TabsTrigger>
                          )}
                          {race.status === RaceStatus.ENDED &&
                            race.results.length == 0 &&
                            race.participants.length + race.invites.length >=
                              2 && (
                              <TabsTrigger value="score">
                                Dodaj wynik
                              </TabsTrigger>
                            )}
                        </TabsList>
                      </DialogTitle>
                    </DialogHeader>
                    <TabsContent value="general">
                      <div className="flex flex-col gap-4">
                        {race.status == RaceStatus.BEFORE && !race.leagueId && (
                          <InviteToRaceBar
                            id={id}
                            createInviteToRace={createInviteToRace}
                          />
                        )}
                        {race.status !== RaceStatus.ENDED && (
                          <ChangeStatusForRaceButton
                            raceID={race.id}
                            ChangeStatus={changeStatus}
                          />
                        )}
                        <DeleteRaceButton
                          raceID={race.id}
                          DeleteRace={deleteRace}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="drivers">
                      <DeleteParticipantFromRaceDialog
                        race={race}
                        invites={race.invites}
                      />
                    </TabsContent>
                    <TabsContent value="score">
                      <RaceResultDialog
                        key={race.id}
                        race={race}
                        invites={race.invites}
                      />
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        {race.league && (
          <Link
            href={`/championships/${race.leagueId}/standings`}
            className="flex gap-2 *:text-[#FFA750] self-center cursor-pointer"
          >
            <Trophy className="size-6" />
            <p>{race.league.name}</p>
          </Link>
        )}
      </div>
      {race.results.length > 1 ? (
        <div className="flex flex-col items-center gap-3">
          <Badge className="bg-gray-600 hover:bg-gray-700">{race.status}</Badge>
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-4xl text-white">{race.name}</p>
            <div className="flex gap-2">
              <Badge className="bg-red-900 hover:bg-red-950">
                {race.series}
              </Badge>
              <Badge className="bg-gray-500 hover:bg-gray-600">
                {race.circuit}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-white">Results</p>
            <div className="grid grid-cols-2 gap-3">
              {race.results.map((person, index) =>
                index % 2 == 0 ? (
                  <div key={index} className="h-[36px]">
                    <ParticipantWithPosition
                      position={index + 1}
                      name={
                        Object.entries(participantsNames).find(
                          (u) => u[1]?.id == person
                        )?.[1]?.name || person
                      }
                      avatar={
                        Object.entries(participantsNames).find(
                          (u) => u[1]?.id == person
                        )?.[1]?.image || ""
                      }
                    />
                  </div>
                ) : (
                  <div key={index} className="mt-3 h-[36px]">
                    <ParticipantWithPosition
                      position={index + 1}
                      name={
                        Object.entries(participantsNames).find(
                          (u) => u[1]?.id == person
                        )?.[1]?.name || person
                      }
                      avatar={
                        Object.entries(participantsNames).find(
                          (u) => u[1]?.id == person
                        )?.[1]?.image || ""
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col justify-center items-center gap-6">
            <Badge
              className={
                {
                  BEFORE: "bg-green-800 hover:bg-green-900",
                  ONGOING: "bg-red-700 hover:bg-red-700",
                  ENDED: "bg-zinc-800 hover:bg-zinc-900",
                }[race.status]
              }
            >
              {race.status}
            </Badge>
            <p className="text-4xl text-white">{race.name.toUpperCase()}</p>
            <div className="flex gap-1">
              <Badge className="bg-red-900 hover:bg-red-950">
                {race.series}
              </Badge>
              <Badge className="bg-gray-500 hover:bg-gray-600">
                {race.circuit}
              </Badge>
            </div>
            <p className="text-white w-full">{race.description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white">Kierowcy:</p>
            <div className="p-3">
              <div className="flex flex-wrap text-white gap-2">
                {race.leagueId ? (
                  (await getChampionship(race.leagueId)).participants.map(
                    (u) => (
                      <Participant
                        key={u.id}
                        avatar={u.user.image ?? ""}
                        name={u.user.name || ""}
                      />
                    )
                  )
                ) : (
                  <>
                    {race.participants.map((p) => {
                      const user = participantsNames[p];
                      return (
                        <Participant
                          key={p}
                          avatar={user?.image ?? ""}
                          name={user?.name || p}
                        />
                      );
                    })}
                    {race.invites.map((i) =>
                      i.user ? (
                        <Participant
                          key={i.id}
                          name={i.user.name!}
                          avatar={i.user.image ?? ""}
                        />
                      ) : (
                        <Participant
                          key={i.id}
                          name={i.userName ?? i.userEmail}
                        />
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RacePage;
