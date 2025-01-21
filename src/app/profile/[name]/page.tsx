import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import Invite from "@/src/components/atoms/Invite/Invite";
import { acceptInvite, deleteInvite } from "../actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TrophyIcon, WeightIcon } from "lucide-react";
import Statistic from "@/src/components/atoms/Statistic/Statistic";

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
    <div className="flex w-full flex-wrap sm:flex-nowrap">
      <div className="flex flex-col gap-2 bg-white p-7 bg-opacity-40 w-full sm:w-3/5">
        <div className="flex items-center gap-2 flex-wrap">
          <Avatar className="size-24">
            <AvatarImage src={session.user?.image || ""} />
          </Avatar>
          <p className="text-2xl text-white">{session.user?.name}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-white">Statystyki ogólne</p>
          <div className="bg-white h-px w-full"></div>
          <div className="flex w-full justify-around pt-6">
            <Statistic
              classname="rounded-tr-3xl rounded-bl-3xl"
              title="Wins"
              number={0}
            >
              <TrophyIcon className="size-14" />
            </Statistic>
            <Statistic
              classname="rounded-tl-3xl rounded-br-3xl"
              title="Podiums"
              number={0}
            >
              <WeightIcon className="size-14" />
            </Statistic>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-black bg-opacity-40 w-full sm:w-2/5 p-4 gap-4">
        {invites.length > 0 ? (
          <>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-white">Zostałeś zaproszony do:</p>
              <div className="bg-white h-px w-3/4"></div>
            </div>
            <div className="flex flex-col w-full items-center gap-2">
              {invites.map((invite) => (
                <Invite
                  key={invite.userEmail}
                  invite={invite}
                  AcceptInvite={acceptInvite}
                  DeleteInvite={deleteInvite}
                />
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-white">Brak zaproszeń</p>
              <div className="bg-white h-px w-3/4"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilepPage;
