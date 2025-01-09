import { Race } from "@prisma/client";
import { getParticipantsNames, getRace, setResults } from "./actions";
import RaceParticipants from "./RaceParticipants/RaceParticipants";

type UserInInvite = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  } | null;
} & {
  id: string;
  leagueId: string | null;
  raceId: string | null;
  userEmail: string;
  userName: string | null;
};

interface RaceResultDialogProps {
  race: Race;
  invites: UserInInvite[];
}

const RaceResultDialog: React.FC<RaceResultDialogProps> = async ({
  race,
  invites,
}) => {
  const allParticipants = invites.length
    ? race.participants.concat(
        invites.map((i) => (i.user ? i.user.id : i.userName ?? i.userEmail))
      )
    : race.participants;

  const existingParticipants = invites.length
    ? race.participants.concat(
        invites.filter((i) => i.user).map((i) => i.user!.id)
      )
    : race.participants;

  const participantsNames = await getParticipantsNames(
    existingParticipants ?? []
  );

  return (
    <div className="flex">
      <div className="flex flex-col py-4 gap-1">
        {allParticipants.map((u, index) => (
          <div className="flex items-center h-[36px] w-[30px]" key={index}>
            {index + 1}
          </div>
        ))}
      </div>
      <div className="grid gap-4 py-4">
        <RaceParticipants
          key={race.id}
          raceId={race.id}
          setResults={setResults}
          participantNames={participantsNames}
          participantsList={allParticipants}
        />
      </div>
    </div>
  );
};

export default RaceResultDialog;
