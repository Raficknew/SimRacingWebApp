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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getParticipantPoints } from "./standings/actions";
import bg from "@/src/assets/8ec323bd-ab9b-43a6-88df-51951fe44f6b.jpg";
import InviteToLeagueBar from "@/src/components/molecules/InviteToLeagueBar/InviteToLeagueBar";
import DeleteParticipantFromLeague from "@/src/components/organisms/DeleteParticipantsFromLeague/DeleteParticipantsFromLeague";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Participant from "@/src/components/atoms/Patricipant/Patricipant";
import ParticipantWithPosition from "@/src/components/atoms/ParticipantWithPosition/ParticipantWithPosition";
import ParticipantWithPointsAndPosition from "@/src/components/atoms/ParticipantWithPointsAndPosition/ParticipantWithPointsAndPosition";

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
    <>
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
            <p className="text-pretty">{championship.name}</p>
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
                  <Tabs defaultValue="general" className="w-[400px]">
                    <TabsList>
                      <TabsTrigger value="general">Ogólne</TabsTrigger>
                      <TabsTrigger value="drivers">
                        Zarządzaj kierowcami
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
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
        {championship.races.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex flex-col gap-7 bg-black bg-opacity-10 p-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-white">Driver standings</div>
                  {participants?.length
                    ? participants
                        .map((u, index) => (
                          <ParticipantWithPointsAndPosition
                            key={index}
                            name={u.name ?? ""}
                            avatar={u.image ?? ""}
                            position={index + 1}
                            points={u.points}
                          />
                        ))
                        .slice(0, 3)
                    : championship.participants
                        .map((u, index) => (
                          <ParticipantWithPointsAndPosition
                            key={index}
                            name={u.user.name ?? ""}
                            avatar={u.user.image ?? ""}
                            position={index + 1}
                            points={0}
                          />
                        ))
                        .slice(0, 3)}
                </div>
                <LinkButton href={`/championships/${id}/standings`}>
                  <Table width={20} height={20} /> <p>Standings</p>
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
    </>
  );
};

export default Championship;
