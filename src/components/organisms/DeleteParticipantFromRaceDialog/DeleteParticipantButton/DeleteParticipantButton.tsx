"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteParticipantButtonProps {
  raceId: string;
  participantId: string;
  DeleteParticipantFromRace: (
    raceID: string,
    participantId: string
  ) => Promise<void>;
}

const DeleteParticipantButton: React.FC<DeleteParticipantButtonProps> = ({
  participantId,
  raceId,
  DeleteParticipantFromRace,
}) => {
  return (
    <Button
      className="p-2 bg-red-500 hover:bg-red-700"
      onClick={() => DeleteParticipantFromRace(raceId, participantId)}
    >
      <Trash className="w-5 h-5" />
    </Button>
  );
};

export default DeleteParticipantButton;
