"use client";
import { Button } from "@/components/ui/button";
import { type Invite } from "@prisma/client";

interface InviteProps {
  invite: Invite;
  DeleteInvite: (inviteId: string) => Promise<void>;
  AcceptInvite: (userEmail: string, inviteId: string) => Promise<void>;
}

const Invite: React.FC<InviteProps> = ({
  invite,
  AcceptInvite,
  DeleteInvite,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 ">
      <p className="text-sm">{invite.id}</p>
      <div className="*:text-xs *:p-2 *:mr-2">
        <Button
          onClick={async () => await AcceptInvite(invite.userEmail, invite.id)}
        >
          Accept
        </Button>
        <Button onClick={async () => await DeleteInvite(invite.id)}>
          Decline
        </Button>
      </div>
    </div>
  );
};

export default Invite;
