"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Trash, UserIcon } from "lucide-react";

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
    <div className="flex bg-opacity-95 text-white justify-between gap-5 min-w-[300px]">
      <div className="flex items-center gap-2 bg-[#3A3A3A] w-full px-3 rounded-sm">
        <Avatar className="size-7">
          <AvatarImage src={participant.image ?? ""} />
          <AvatarFallback className="bg-custom-gradient">
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
        <p>{participant.name}</p>
      </div>
      <Button
        className="p-2 bg-red-500 hover:bg-red-700"
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
