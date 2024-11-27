import { notFound } from "next/navigation";
import { getParticipantPoints } from "./actions";
import ParticipantBox from "@/src/components/atoms/PatricipantBox/PatricipantBox";
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
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import DeleteLeagueButton from "../DeleteLeagueButton/DeleteLeagueButton";
import bg from "@/src/assets/8ec323bd-ab9b-43a6-88df-51951fe44f6b.jpg";
import InviteToLeagueBar from "@/src/components/molecules/InviteToLeagueBar/InviteToLeagueBar";

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
          {championship.name} Standings
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
                  <LinkButton href={`/championships/${id}/create-race`}>
                    <Flag className="w-4 h-4" />
                    <p>Create Race</p>
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
          <TableBody>
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
                    <TableCell className="text-blue-400">Narazie NIE</TableCell>
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
                    <TableCell className="text-white">Narazie NIE</TableCell>
                    <TableCell className="text-right text-red-300">0</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <div
          className="absolute top-0 left-0 z-[-2] min-h-screen w-full bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute top-0 left-0 z-[-1] min-h-screen w-full bg-cover bg-center flex justify-center items-center bg-black opacity-30"></div>
      </div>
    </div>
  );
};

export default StandingsPage;
