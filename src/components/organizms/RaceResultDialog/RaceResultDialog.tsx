import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getRace } from "./actions";
import RaceParticipants from "./RaceParticipants/RaceParticipants";

interface RaceResultDialogProps {
  raceId: string;
}

const RaceResultDialog: React.FC<RaceResultDialogProps> = async ({
  raceId,
}) => {
  const race = await getRace(raceId);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Dodaj wynik</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wynik wyścigu dla {race?.name}</DialogTitle>
          <DialogDescription>
            Ustaw kierowców w kolejności miejsca na mecie po zakończeniu wyścigu
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RaceParticipants participantsList={race?.participants!} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RaceResultDialog;
