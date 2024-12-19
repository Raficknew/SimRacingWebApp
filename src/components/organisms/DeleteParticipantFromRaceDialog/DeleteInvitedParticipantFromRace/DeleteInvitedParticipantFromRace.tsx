"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteInvitedParticipantFromRaceProps {
  raceID: string;
  inviteID: string;
  DeleteInvitedParticipant: (inviteId: string, raceId: string) => Promise<void>;
}

const DeleteInvitedParticipantFromRace: React.FC<
  DeleteInvitedParticipantFromRaceProps
> = ({ DeleteInvitedParticipant, inviteID, raceID }) => {
  return (
    <Button
      className="p-2 bg-red-500 hover:bg-red-700"
      onClick={() => DeleteInvitedParticipant(raceID, inviteID)}
    >
      <Trash className="w-5 h-5" />
    </Button>
  );
};

export default DeleteInvitedParticipantFromRace;
