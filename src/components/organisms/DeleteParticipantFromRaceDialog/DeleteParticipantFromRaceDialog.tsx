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
import ParticipantToDelete from "./ParticipantToDelete/ParticipantToDelete";

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
    <div className="flex w-fit flex-col gap-2">
      {Object.entries(participantsNames).map(([id, user]) =>
        user ? (
          <ParticipantToDelete
            key={id}
            name={user?.name ?? id}
            avatar={user?.image ?? ""}
            raceID={race.id}
            participantID={user?.id}
          />
        ) : (
          <ParticipantToDelete key={id} name={id} raceID={race.id} />
        )
      )}
      {invites.map((i) =>
        i.user ? (
          <ParticipantToDelete
            key={i.id}
            name={i.user.name ?? i.user.id}
            avatar={i.user.image ?? ""}
            inviteID={i.id}
            raceID={race.id}
          />
        ) : (
          <ParticipantToDelete
            key={i.id}
            name={i.userName ?? i.userEmail}
            inviteID={i.id}
            raceID={race.id}
          />
        )
      )}
    </div>
  );
};

export default DeleteParticipantFromRaceDialog;
