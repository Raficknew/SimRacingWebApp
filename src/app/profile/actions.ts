"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { isInviteReciever } from "@/src/actions/actions";

export const DeleteInvite = async (inviteId: string) => {
  const invite = await prisma.invite.findUnique({ where: { id: inviteId } });

  if (!invite) return;

  if (!(await isInviteReciever(invite.userEmail))) return;

  await prisma.invite.delete({ where: { id: inviteId } });
  // revalidatePath("/profile");
  redirect("/profile");
};

export const AcceptInvite = async (
  raceId: string,
  userEmail: string,
  inviteId: string
) => {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  if (user?.email && (await isInviteReciever(user.email))) {
    await prisma.race.update({
      where: { id: raceId },
      data: { participants: { push: user.email } },
    });
  }

  await DeleteInvite(inviteId);
  // revalidatePath("/profile");
};
