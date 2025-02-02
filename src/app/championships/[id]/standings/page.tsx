import { notFound } from "next/navigation";
import { getParticipantPoints } from "./actions";
import ParticipantBox from "@/src/components/atoms/Patricipant/Patricipant";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  createInviteToLeague,
  deleteLeague,
  getChampionship,
  getChampionshipAuthor,
} from "../actions";
import { Flag, Settings, Trophy } from "lucide-react";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import DeleteLeagueButton from "../DeleteLeagueButton/DeleteLeagueButton";
import bg from "@/src/assets/8ec323bd-ab9b-43a6-88df-51951fe44f6b.jpg";
import InviteToLeagueBar from "@/src/components/molecules/InviteToLeagueBar/InviteToLeagueBar";
import CustomBackground from "@/src/components/atoms/CustomBackground/CustomBackground";

type StandingsPageProps = {
  params: {
    id: string;
  };
};

const StandingsPage: React.FC<StandingsPageProps> = async ({
  params: { id },
}) => {
  const championship = await getChampionship(id);

  if (!championship) notFound();

  const leagueAuthor = await getChampionshipAuthor(id);

  const participants = await getParticipantPoints(id);
  const session = await getServerSession(authOptions);

  if (!participants) notFound();

  return (
    <div className="flex flex-col bg-custom-gradient rounded-sm p-5 min-h-[630px] gap-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar className="w-8 h-8">
            <AvatarImage src={leagueAuthor?.author.image || ""} />
          </Avatar>
          <p className="text-sm text-white">{leagueAuthor?.author.name}</p>
        </div>
        <div className="flex self-stretch flex-wrap justify-center items-center gap-2  text-orange-400 px-3 py-0.5 rounded-full">
          <Trophy />
          {championship.name} Klasyfikacja
        </div>
        <div className="w-[104px] flex justify-end">
          {session?.user?.email == leagueAuthor?.author.email && (
            <Dialog>
              <DialogTrigger asChild>
                <Settings className="text-white cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ustawienia</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-5">
                  <LinkButton
                    classname="border"
                    href={`/championships/${id}/create-race`}
                  >
                    <Flag className="w-4 h-4" />
                    <p>Utwórz wyścig</p>
                  </LinkButton>
                  <InviteToLeagueBar
                    createInvite={createInviteToLeague}
                    id={id}
                  />
                  <DeleteLeagueButton
                    leagueId={id}
                    deleteLeague={deleteLeague}
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap">
        <Table className="bg-gray-100 bg-opacity-5 rounded-md">
          <TableHeader className="bg-[#303030] bg-opacity-40">
            <TableRow className="*:text-white">
              <TableHead>#</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead className="text-right">Punkty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#3A3A3A] opacity-95">
            {participants.length
              ? participants.map((u, index) => (
                  <TableRow key={index}>
                    <TableCell
                      className={
                        {
                          1: "text-yellow-200",
                          2: "text-gray-300",
                          3: "text-amber-700",
                        }[index + 1] || "text-gray-500"
                      }
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-white">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={u.image || ""} />
                        </Avatar>
                        {u.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-white">
                      {u.points}
                    </TableCell>
                  </TableRow>
                ))
              : championship.participants.map((u, index) => (
                  <TableRow key={index}>
                    <TableCell
                      className={
                        {
                          1: "text-yellow-200",
                          2: "text-gray-300",
                          3: "text-amber-700",
                        }[index + 1] || "text-gray-500"
                      }
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-white">{u.user.name}</TableCell>
                    <TableCell className="text-right text-red-300">0</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <CustomBackground bg={bg.src} />
    </div>
  );
};

export default StandingsPage;
