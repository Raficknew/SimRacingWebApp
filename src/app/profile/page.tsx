import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import Invite from "@/src/components/atoms/Invite/Invite";
import { AcceptInvite, DeleteInvite } from "./actions";
import prisma from "@/lib/db/prisma";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const invites = await prisma.invite.findMany({
    where: { userEmail: session?.user?.email! },
    include: { race: { select: { name: true } } },
  });
  return (
    <>
      <div>Invites:</div>
      {invites.map((invite) => (
        <Invite
          key={invite.userEmail}
          invite={invite}
          raceName={invite.race.name}
          AcceptInvite={AcceptInvite}
          DeleteInvite={DeleteInvite}
        />
      ))}
    </>
  );
};

export default ProfilePage;
