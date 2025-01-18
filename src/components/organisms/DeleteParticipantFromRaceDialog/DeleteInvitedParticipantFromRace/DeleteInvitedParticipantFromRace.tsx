"use client";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteInvitedParticipantFromRaceProps {
  raceID: string;
  inviteID: string;
  DeleteInvitedParticipant: (
    inviteId: string,
    raceId: string
  ) => Promise<{ error: string } | void>;
}

const DeleteInvitedParticipantFromRace: React.FC<
  DeleteInvitedParticipantFromRaceProps
> = ({ DeleteInvitedParticipant, inviteID, raceID }) => {
  async function handleDeleteInvitedParticipant(
    raceID: string,
    inviteID: string
  ) {
    const result = await DeleteInvitedParticipant(raceID, inviteID);
    result?.error
      ? toast.error(result.error, { richColors: true, duration: 2000 })
      : toast.success("Usunięto zaproszenie", {
          richColors: true,
          duration: 2000,
        });
  }
  return (
    <DialogClose>
      <Button
        className="p-2 bg-red-500 hover:bg-red-700"
        onClick={() => handleDeleteInvitedParticipant(raceID, inviteID)}
      >
        <Trash className="w-5 h-5" />
      </Button>
    </DialogClose>
  );
};

export default DeleteInvitedParticipantFromRace;
