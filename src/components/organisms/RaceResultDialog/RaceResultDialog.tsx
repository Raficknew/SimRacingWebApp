import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Dodaj wynik</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wynik wyścigu dla {race.name}</DialogTitle>
          <DialogDescription>
            Ustaw kierowców w kolejności miejsca na mecie po zakończeniu wyścigu
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RaceParticipants
            key={race.id}
            raceId={race.id}
            setResults={setResults}
            participantsList={Object.entries(participantsNames).map(
              ([mail, name]) => name ?? mail
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RaceResultDialog;
