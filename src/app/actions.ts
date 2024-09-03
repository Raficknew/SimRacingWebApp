"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";

export const DeleteInvite = async (inviteId: string) => {
  await prisma.invite.delete({ where: { id: inviteId } });
  revalidatePath("/");
  redirect("/");
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
  revalidatePath("/");
};
