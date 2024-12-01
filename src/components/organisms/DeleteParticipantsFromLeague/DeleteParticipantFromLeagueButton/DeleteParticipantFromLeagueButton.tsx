"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Trash } from "lucide-react";

interface DeleteParticipantFromLeagueButonProps {
  participant: User;
  championshipID: string;
  DeleteParticipantFromLeague: (
    participantID: string,
    championshipID: string
  ) => Promise<void>;
}

const DeleteParticipantFromLeagueButon: React.FC<
  DeleteParticipantFromLeagueButonProps
> = ({ participant, championshipID, DeleteParticipantFromLeague }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded-lg">
      <div className="flex justify-center items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={participant.image || ""} />
        </Avatar>
        {participant.name}
      </div>
      <Button
        className="p-2 bg-red-300"
        onClick={() =>
          DeleteParticipantFromLeague(participant.id, championshipID)
        }
      >
        <Trash className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default DeleteParticipantFromLeagueButon;
