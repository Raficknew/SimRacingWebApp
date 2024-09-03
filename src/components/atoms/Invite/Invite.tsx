"use client";
import { Button } from "@/components/ui/button";

interface InviteProps {
  raceName: string;
  inviteId: string;
  raceId: string;
  userEmail: string;
  DeleteInvite: (inviteId: string) => Promise<void>;
  AcceptInvite: (
    raceId: string,
    userEmail: string,
    inviteId: string
  ) => Promise<void>;
}

const Invite: React.FC<InviteProps> = ({
  raceName,
  inviteId,
  raceId,
  userEmail,
  AcceptInvite,
  DeleteInvite,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 ">
      <p className="text-sm">{raceName}</p>
      <div className="*:text-xs *:p-2 *:mr-2">
        <Button
          onClick={async () => await AcceptInvite(raceId, userEmail, inviteId)}
        >
          Accept
        </Button>
        <Button onClick={async () => await DeleteInvite(inviteId)}>
          Decline
        </Button>
      </div>
    </div>
  );
};

export default Invite;
