import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import Invite from "@/src/components/atoms/Invite/Invite";
import { acceptInvite, deleteInvite } from "./actions";
import prisma from "@/lib/db/prisma";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const invites = await prisma.invite.findMany({
    where: { userEmail: session?.user?.email! },
    include: {
      race: { select: { name: true } },
      league: { select: { name: true } },
    },
  });

  return (
    <>
      <div>Invites:</div>
      {invites.length > 0 &&
        invites.map((invite) => (
          <Invite
            key={invite.userEmail}
            invite={invite}
            AcceptInvite={acceptInvite}
            DeleteInvite={deleteInvite}
          />
        ))}
    </>
  );
};

export default ProfilePage;
