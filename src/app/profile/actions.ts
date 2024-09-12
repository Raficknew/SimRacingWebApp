"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

async function isReciever(reciever: string) {
  const session = await getServerSession(authOptions);

  if (!session) return false;

  if (reciever !== session.user?.email) return false;

  return true;
}

export const DeleteInvite = async (inviteId: string) => {
  const invite = await prisma.invite.findUnique({ where: { id: inviteId } });

  if (!invite) return;

  if (!(await isReciever(invite.userEmail))) return;

  await prisma.invite.delete({ where: { id: inviteId } });
  revalidatePath("/profile");
  redirect("/profile");
};

export const AcceptInvite = async (
  raceId: string,
  userEmail: string,
  inviteId: string
) => {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  if (user?.email) {
    await prisma.race.update({
      where: { id: raceId },
      data: { participants: { push: user.email } },
    });
  }

  await DeleteInvite(inviteId);
  revalidatePath("/profile");
};
