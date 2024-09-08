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
import RaceResultDialogButton from "./RaceResultDialogButton/RaceResultDialogButton";
import { getParticipant, getRace } from "./actions";

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
          {race?.participants.map((p, index) => (
            <div className="flex justify-between w-full" key={index.toString()}>
              <p>{index + 1}</p>
              <p>{p}</p>
              <p>Fastest lap ?</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <RaceResultDialogButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RaceResultDialog;
