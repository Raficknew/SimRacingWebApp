"use client";
import { Button } from "@/components/ui/button";
import { type Invite } from "@prisma/client";
import { toast } from "sonner";

type InviteDetails = {
  race: { name: string } | null;
  league: { name: string } | null;
};
interface InviteProps {
  invite: InviteDetails & Invite;
  DeleteInvite: (inviteId: string) => Promise<{ error: string } | void>;
  AcceptInvite: (
    userEmail: string,
    inviteId: string
  ) => Promise<{ error: string } | void>;
}

const Invite: React.FC<InviteProps> = ({
  invite,
  AcceptInvite,
  DeleteInvite,
}) => {
  async function handleAcceptInvite(userEmail: string, inviteId: string) {
    const result = await AcceptInvite(userEmail, inviteId);
    result?.error
      ? toast.error(result.error)
      : toast.success("Zaakcepotowano zaproszenie");
  }

  async function handleDeleteInvite(inviteId: string) {
    const result = await DeleteInvite(invite.id);
    result?.error
      ? toast.error(result.error)
      : toast.success("Odrzucono zaproszenie");
  }

  return (
    <div className="flex w-full gap-2 p-2 items-center bg-[#303030] rounded-lg justify-between">
      <p className="text-sm text-pretty text-white">
        {invite.league?.name ?? invite.race?.name}
      </p>
      <div className="flex items-center md:flex-nowrap flex-wrap *:h-7 *:p-2 *:text-xs gap-2">
        <Button
          className="bg-green-900 hover:bg-green-950"
          onClick={() => handleAcceptInvite(invite.userEmail, invite.id)}
        >
          Przyjmij
        </Button>
        <Button
          className="bg-red-900 hover:bg-red-950"
          onClick={() => handleDeleteInvite(invite.id)}
        >
          Odrzuć
        </Button>
      </div>
    </div>
  );
};

export default Invite;
