import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import { Flag, Settings, Table, Trophy } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InviteToLeagueBar from "@/src/components/molecules/InviteToLeagueBar/InviteToLeagueBar";
import DeleteParticipantFromLeague from "@/src/components/organisms/DeleteParticipantsFromLeague/DeleteParticipantsFromLeague";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeleteLeagueButton from "@/src/app/championships/[id]/DeleteLeagueButton/DeleteLeagueButton";
import {
  createInviteToLeague,
  deleteLeague,
} from "@/src/app/championships/[id]/actions";
import { League } from "@prisma/client";

type Author =
  | {
      name: string | null;
      email: string | null;
      image: string | null;
    }
  | undefined;

interface LeagueTopBarProps {
  championship: League;
  leagueAuthor: Author;
}

const LeagueTopBar: React.FC<LeagueTopBarProps> = async ({
  championship,
  leagueAuthor,
}) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Avatar className="w-8 h-8">
          <AvatarImage src={leagueAuthor?.image || ""} />
        </Avatar>
        <p className="text-sm text-white">{leagueAuthor?.name}</p>
      </div>
      <div className="flex self-stretch flex-wrap justify-center items-center gap-2  text-orange-400 px-3 py-0.5 rounded-full">
        <Trophy />
        <p className="text-pretty">{championship.name}</p>
      </div>
      <div className="w-[104px] flex justify-end">
        {session?.user?.email == leagueAuthor?.email && (
          <Dialog>
            <DialogTrigger asChild>
              <Settings className="text-white cursor-pointer size-6" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ustawienia</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="general" className="w-[400px]">
                <TabsList className="bg-white">
                  <TabsTrigger value="general">Ogólne</TabsTrigger>
                  <TabsTrigger value="drivers">
                    Zarządzaj kierowcami
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                  <div className="flex flex-col gap-5">
                    <InviteToLeagueBar
                      createInvite={createInviteToLeague}
                      id={championship.id}
                    />
                    <LinkButton
                      classname="border"
                      href={`/championships/${championship.id}/create-race`}
                    >
                      <Flag className="size-4" />
                      <p>Create Race</p>
                    </LinkButton>
                    <DeleteLeagueButton
                      leagueId={championship.id}
                      deleteLeague={deleteLeague}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="drivers">
                  <DeleteParticipantFromLeague
                    championshipId={championship.id}
                  />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default LeagueTopBar;
