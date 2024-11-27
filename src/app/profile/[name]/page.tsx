import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import Invite from "@/src/components/atoms/Invite/Invite";
import { acceptInvite, deleteInvite } from "../actions";

const ProfilepPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin?callbackUrl=/profile");

  const invites = await prisma.invite.findMany({
    where: { userEmail: session?.user?.email! },
    include: {
      race: { select: { name: true } },
      league: { select: { name: true } },
    },
  });

  return (
    <>
      <div>Your Invites:</div>
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

export default ProfilepPage;
