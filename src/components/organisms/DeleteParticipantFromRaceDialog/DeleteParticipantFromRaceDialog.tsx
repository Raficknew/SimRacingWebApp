import { type Race } from "@prisma/client";
import { getParticipantsNames } from "../RaceResultDialog/actions";
import DeleteParticipantButton from "./DeleteParticipantButton/DeleteParticipantButton";
import {
  DeleteInvitedParticipant,
  DeleteParticipantFromRace,
} from "@/src/app/races/[id]/actions";
import DeleteInvitedParticipantFromRace from "./DeleteInvitedParticipantFromRace/DeleteInvitedParticipantFromRace";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Participant from "../../atoms/Patricipant/Patricipant";

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
        <div className="flex rounded-sm gap-5" key={id}>
          {user ? (
            <Participant
              key={user.id}
              name={user.name ?? ""}
              avatar={user.image ?? ""}
            />
          ) : (
            <Participant key={id} name={id} />
          )}

          <DeleteParticipantButton
            participantId={id}
            raceId={race.id}
            DeleteParticipantFromRace={DeleteParticipantFromRace}
          />
        </div>
      ))}
      {invites.map((i) => (
        <div className="flex rounded-sm gap-5" key={i.id}>
          {i.user ? (
            <Participant
              key={i.user.id}
              name={i.user.name ?? ""}
              avatar={i.user.image ?? ""}
            />
          ) : (
            <Participant key={i.id} name={i.userName ?? i.userEmail} />
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
