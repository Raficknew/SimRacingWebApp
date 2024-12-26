import { getParticipantsNames, getRace, setResults } from "./actions";
import RaceParticipants from "./RaceParticipants/RaceParticipants";
import { notFound } from "next/navigation";

interface RaceResultDialogProps {
  raceId: string;
}

const RaceResultDialog: React.FC<RaceResultDialogProps> = async ({
  raceId,
}) => {
  const race = await getRace(raceId);

  if (!race) notFound();

  const participantsNames = await getParticipantsNames(race.participants ?? []);

  const totalParticipants = race.invites.length
    ? race.participants.concat(
        race.invites.map((i) => i.userName ?? i.userEmail)
      )
    : race.participants;

  return (
    <div className="flex">
      <div className="flex flex-col py-4 gap-1">
        {totalParticipants.map((u, index) => (
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
          participantsList={totalParticipants}
        />
      </div>
    </div>
  );
};

export default RaceResultDialog;
