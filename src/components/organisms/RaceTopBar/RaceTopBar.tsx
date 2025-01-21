import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import DeleteRaceButton from "@/src/app/races/[id]/DeleteRaceButton/DeleteRaceButton";
import RaceResultDialog from "@/src/components/organisms/RaceResultDialog/RaceResultDialog";
import { Race, Invite, RaceStatus } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Clock2, Settings, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChangeStatusForRaceButton from "@/src/app/races/[id]/ChangeStatusForRaceButton/ChangeStatusForRaceButton";
import InviteToRaceBar from "@/src/components/molecules/InviteToRaceBar/InviteToRaceBar";
import DeleteParticipantFromRaceDialog from "@/src/components/organisms/DeleteParticipantFromRaceDialog/DeleteParticipantFromRaceDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  changeStatus,
  createInviteToRace,
  deleteRace,
} from "@/src/app/races/[id]/actions";
import dayjs from "dayjs";
import "dayjs/locale/pl";

type ExtendedRace = {
  invites: ({
    user: {
      name: string | null;
      id: string;
      image: string | null;
      email: string | null;
      emailVerified: Date | null;
    } | null;
  } & Invite)[];
  author: {
    name: string | null;
    id: string;
    image: string | null;
    email: string | null;
    emailVerified: Date | null;
  };
  league: {
    name: string;
  } | null;
};

interface RaceTopBarProps {
  race: Race & ExtendedRace;
}

const RaceTopBar: React.FC<RaceTopBarProps> = async ({ race }) => {
  const session = await getServerSession(authOptions);
  dayjs.locale("pl");
  return (
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
                        {race.status !== RaceStatus.ENDED &&
                          race.participants.length + race.invites.length >
                            0 && (
                            <TabsTrigger value="drivers">
                              Zarządzaj kierowcami
                            </TabsTrigger>
                          )}
                        {race.status === RaceStatus.ENDED &&
                          race.results.length == 0 &&
                          race.participants.length + race.invites.length >=
                            2 && (
                            <TabsTrigger value="score">Dodaj wynik</TabsTrigger>
                          )}
                      </TabsList>
                    </DialogTitle>
                  </DialogHeader>
                  <TabsContent value="general">
                    <div className="flex flex-col gap-4">
                      {race.status == RaceStatus.BEFORE && !race.leagueId && (
                        <InviteToRaceBar
                          id={race.id}
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
                        deleteRace={deleteRace}
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
  );
};

export default RaceTopBar;
