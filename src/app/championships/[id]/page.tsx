import RaceCard from "@/src/components/molecules/RaceCard/RaceCard";
import {
  createInviteToLeague,
  deleteLeague,
  getChampionship,
  getChampionshipAuthor,
} from "./actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import { Flag, Settings, Table, Trophy } from "lucide-react";
import DeleteLeagueButton from "./DeleteLeagueButton/DeleteLeagueButton";
import InviteBar from "@/src/components/molecules/InviteBar/Invitebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ParticipantBox from "@/src/components/atoms/PatricipantBox/PatricipantBox";
import { getParticipantPoints } from "./standings/actions";

type ChampionshipProps = {
  params: {
    id: string;
  };
};

const Championship: React.FC<ChampionshipProps> = async ({
  params: { id },
}) => {
  const championship = await getChampionship(id);
  const leagueAuthor = await getChampionshipAuthor(id);
  const participants = await getParticipantPoints(id);

  if (!championship) notFound();

  const nextRace = championship.races.findLast(
    (race) => race.status === "BEFORE" || race.status === "ONGOING"
  );
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col bg-[#303030] rounded-sm p-5 min-h-[630px] gap-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar className="w-8 h-8">
            <AvatarImage src={leagueAuthor?.author.image || ""} />
          </Avatar>
          <p className="text-sm text-white">{leagueAuthor?.author.name}</p>
        </div>
        <div className="flex self-stretch flex-wrap justify-center items-center gap-2  text-orange-400 px-3 py-0.5 rounded-full">
          <Trophy />
          {championship.name}
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
                  <InviteBar id={id} createInvite={createInviteToLeague} />
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
      {championship.races.length > 0 ? (
        <>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex flex-col gap-7 bg-black bg-opacity-10 p-6">
              <div className="flex flex-col items-center gap-2">
                <p className="text-white">Driver standings</p>
                {participants?.length
                  ? participants
                      .map((u, index) => (
                        <ParticipantBox
                          key={u.driver}
                          position={index + 1}
                          points={u.points}
                        >
                          {u.driver}
                        </ParticipantBox>
                      ))
                      .slice(0, 3)
                  : championship.participants
                      .map((u, index) => (
                        <ParticipantBox
                          key={u?.user.name}
                          position={index + 1}
                          points={0}
                        >
                          <div className="flex justify-center items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={u?.user.image || ""} />
                            </Avatar>
                            {u?.user.name}
                          </div>
                        </ParticipantBox>
                      ))
                      .slice(0, 3)}
              </div>
              <LinkButton href={`/championships/${id}/standings`}>
                <Table width={20} height={20} /> Standings
              </LinkButton>
            </div>
            <div className="flex flex-col w-[430px]">
              {nextRace ? (
                <div>
                  <p className="text-white">Następny wyścig:</p>
                  <div>
                    <Link key={nextRace.id} href={`/races/${nextRace?.id}`}>
                      <RaceCard author={nextRace.author} race={nextRace} />
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-white self-center">
                  Brak następnych wyścigów
                </p>
              )}
            </div>
          </div>{" "}
        </>
      ) : (
        <div className="flex justify-center items-center">
          Liga nie ma wyścigów
        </div>
      )}
    </div>
  );
};

export default Championship;
