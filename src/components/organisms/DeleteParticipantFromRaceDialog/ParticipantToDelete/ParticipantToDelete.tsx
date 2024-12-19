import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import DeleteParticipantButton from "../DeleteParticipantButton/DeleteParticipantButton";
import {
  DeleteInvitedParticipant,
  DeleteParticipantFromRace,
} from "@/src/app/races/[id]/actions";
import DeleteInvitedParticipantFromRace from "../DeleteInvitedParticipantFromRace/DeleteInvitedParticipantFromRace";

interface ParticipantToDeleteProps {
  name: string;
  avatar?: string;
  participantID?: string;
  inviteID?: string;
  raceID: string;
}

const ParticipantToDelete: React.FC<ParticipantToDeleteProps> = ({
  name,
  avatar,
  participantID,
  inviteID,
  raceID,
}) => {
  return (
    <div className="flex bg-opacity-95 text-white justify-between gap-5 min-w-[300px]">
      <div className="flex items-center gap-2 bg-[#3A3A3A] w-full px-3 rounded-sm">
        <Avatar className="size-7">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-custom-gradient">
            <User className="size-5" />
          </AvatarFallback>
        </Avatar>
        <p>{name}</p>
      </div>
      {participantID ? (
        <DeleteParticipantButton
          participantId={participantID}
          raceId={raceID}
          DeleteParticipantFromRace={DeleteParticipantFromRace}
        />
      ) : (
        <DeleteInvitedParticipantFromRace
          raceID={raceID}
          inviteID={inviteID!}
          DeleteInvitedParticipant={DeleteInvitedParticipant}
        />
      )}
    </div>
  );
};

export default ParticipantToDelete;
