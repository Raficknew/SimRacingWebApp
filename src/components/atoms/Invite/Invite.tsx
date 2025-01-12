"use client";
import { Button } from "@/components/ui/button";
import { type Invite } from "@prisma/client";

type InviteDetails = {
  race: { name: string } | null;
  league: { name: string } | null;
};
interface InviteProps {
  invite: InviteDetails & Invite;
  DeleteInvite: (inviteId: string) => Promise<void>;
  AcceptInvite: (userEmail: string, inviteId: string) => Promise<void>;
}

const Invite: React.FC<InviteProps> = ({
  invite,
  AcceptInvite,
  DeleteInvite,
}) => {
  return (
    <div className="flex w-full gap-2 p-2 items-center bg-[#303030] rounded-lg">
      <p className="text-sm text-pretty text-white">
        {invite.league?.name ?? invite.race?.name}
      </p>
      <div className="flex items-center md:flex-nowrap flex-wrap *:h-7 *:p-2 *:text-xs gap-2">
        <Button
          className="bg-green-900 hover:bg-green-950"
          onClick={async () => await AcceptInvite(invite.userEmail, invite.id)}
        >
          Przyjmij
        </Button>
        <Button
          className="bg-red-900 hover:bg-red-950"
          onClick={async () => await DeleteInvite(invite.id)}
        >
          Odrzuć
        </Button>
      </div>
    </div>
  );
};

export default Invite;
