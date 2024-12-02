import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Invite, User, type Race } from "@prisma/client";
import { getParticipantsNames } from "../RaceResultDialog/actions";
import DeleteParticipantButton from "./DeleteParticipantButton/DeleteParticipantButton";
import {
  DeleteInvitedParticipant,
  DeleteParticipantFromRace,
} from "@/src/app/races/[id]/actions";
import DeleteInvitedParticipantFromRace from "./DeleteInvitedParticipantFromRace/DeleteInvitedParticipantFromRace";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type UserInInvite = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  } | null;
} & {
  id: string;
  leagueId: string | null;
  raceId: string | null;
  userEmail: string;
  userName: string | null;
};

type DeleteParticipantFromRaceDialogProps = {
  race: Race;
  invites: UserInInvite[];
};

const DeleteParticipantFromRaceDialog: React.FC<
  DeleteParticipantFromRaceDialogProps
> = async ({ race, invites }) => {
  const participantsNames = await getParticipantsNames(race.participants ?? []);
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(participantsNames).map(([id, user]) => (
        <div
          className="flex justify-between items-center bg-gray-100 rounded-sm px-2"
          key={id}
        >
          {user ? (
            <div className="flex justify-center items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image || ""} />
              </Avatar>
              {user.name}
            </div>
          ) : (
            id
          )}

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
          {i.user ? (
            <div className="flex justify-center items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={i.user.image || ""} />
              </Avatar>
              {i.user.name}
            </div>
          ) : (
            i.userName ?? i.userName
          )}

          <DeleteInvitedParticipantFromRace
            raceID={race.id}
            inviteID={i.id}
            DeleteInvitedParticipant={DeleteInvitedParticipant}
          />
        </div>
      ))}
    </div>
  );
};

export default DeleteParticipantFromRaceDialog;
