import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Invite, type Race } from "@prisma/client";
import { Trash } from "lucide-react";
import { getParticipantsNames } from "../RaceResultDialog/actions";
import DeleteParticipantButton from "./DeleteParticipantButton/DeleteParticipantButton";
import { DeleteParticipantFromRace } from "@/src/app/races/[id]/actions";

type DeleteParticipantFromRaceDialogProps = {
  race: Race;
  invites: Invite[];
};

const DeleteParticipantFromRaceDialog: React.FC<
  DeleteParticipantFromRaceDialogProps
> = async ({ race, invites }) => {
  const participantsNames = await getParticipantsNames(race.participants ?? []);
  return (
    <Dialog>
      <DialogTrigger>Manage</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuń Kierowcę</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {Object.entries(participantsNames).map(([id, user]) => (
            <div
              className="flex justify-between items-center bg-gray-100 rounded-sm px-2"
              key={id}
            >
              {user ? user.name : id}

              <DeleteParticipantButton
                participantId={id}
                raceId={race.id}
                DeleteParticipantFromRace={DeleteParticipantFromRace}
              />
            </div>
          ))}
          {invites.map((i) => (
            <div
              className="flex justify-between items-center bg-gray-100 rounded-sm px-2"
              key={i.id}
            >
              {i.userName ?? i.userEmail}

              <Button className="p-2 bg-red-300">
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteParticipantFromRaceDialog;