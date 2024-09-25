"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { isInviteReciever } from "@/src/actions/actions";

export const deleteInvite = async (inviteId: string) => {
  const invite = await prisma.invite.findUnique({ where: { id: inviteId } });

  if (!invite) return;

  if (!(await isInviteReciever(invite.id))) return;

  await prisma.invite.delete({ where: { id: inviteId } });
  // revalidatePath("/profile");
  redirect("/profile");
};

export const acceptInvite = async (
  raceId: string,
  userEmail: string,
  inviteId: string
) => {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!user) return;

  if (user.email && (await isInviteReciever(inviteId))) {
    await prisma.race.update({
      where: { id: raceId },
      data: { participants: { push: user.email } },
    });
    await deleteInvite(inviteId);
    // revalidatePath("/profile");
    redirect(`races/${raceId}`);
  } else {
    await deleteInvite(inviteId);
    // revalidatePath("/profile");
  }
};
