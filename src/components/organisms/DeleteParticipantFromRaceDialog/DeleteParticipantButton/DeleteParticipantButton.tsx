"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteParticipantButtonProps {
  raceId: string;
  participantId: string;
  DeleteParticipantFromRace: (
    raceID: string,
    participantId: string
  ) => Promise<{ error: string } | void>;
}

const DeleteParticipantButton: React.FC<DeleteParticipantButtonProps> = ({
  participantId,
  raceId,
  DeleteParticipantFromRace,
}) => {
  async function handleDeleteParticipantFromRace(
    raceId: string,
    participantId: string
  ) {
    const result = await DeleteParticipantFromRace(raceId, participantId);
    result?.error
      ? toast.error(result.error, { richColors: true, duration: 2000 })
      : toast.success("Usunięto uczestnika z wyścigu", {
          richColors: true,
          duration: 2000,
        });
  }
  return (
    <DialogClose>
      <Button
        className="p-2 bg-red-500 hover:bg-red-700"
        onClick={() => handleDeleteParticipantFromRace(raceId, participantId)}
      >
        <Trash className="w-5 h-5" />
      </Button>
    </DialogClose>
  );
};

export default DeleteParticipantButton;
