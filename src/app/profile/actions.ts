"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { isInviteReciever } from "@/src/actions/actions";

export const deleteInvite = async (
  inviteId: string,
  raceId?: string,
  leagueId?: string
) => {
  const invite = await prisma.invite.findUnique({ where: { id: inviteId } });

  if (!invite) return;

  if (!(await isInviteReciever(invite.id))) return;

  await prisma.invite.delete({ where: { id: inviteId } });

  revalidatePath("/profile");

  if (raceId) redirect(`/races/${raceId}`);

  if (leagueId) redirect(`/championships/${leagueId}`);

  redirect(`/profile`);
};

export const acceptInvite = async (userEmail: string, inviteId: string) => {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!user) return;

  const invite = await prisma.invite.findUnique({ where: { id: inviteId } });

  if (!invite) return;

  if (!(await isInviteReciever(inviteId))) return;

  if (user.email && invite.raceId) {
    await prisma.race.update({
      where: { id: invite.raceId },
      data: { participants: { push: user.email } },
    });
    await deleteInvite(inviteId, invite.raceId);
  } else if (invite.leagueId) {
    await prisma.leagueParticipant.create({
      data: { userId: user.id, leagueId: invite.leagueId, points: 0 },
    });
    await deleteInvite(inviteId, undefined, invite.leagueId);
  } else {
    await deleteInvite(inviteId);
  }
};
