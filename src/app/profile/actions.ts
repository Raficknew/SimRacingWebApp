"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { isInviteReciever } from "@/src/actions/actions";
import { error } from "console";

export const deleteInvite = async (
  inviteId: string,
  raceId?: string,
  leagueId?: string
) => {
  const invite = await prisma.invite.findUnique({
    where: { id: inviteId },
    include: { user: { select: { name: true } } },
  });

  if (!invite) return { error: "Coś poszło nie tak" };

  if (!(await isInviteReciever(invite.id)))
    return { error: "Coś poszło nie tak" };

  await prisma.invite.delete({ where: { id: inviteId } });

  revalidatePath(`/profile/${invite.user?.name}`);

  if (raceId) redirect(`/races/${raceId}`);

  if (leagueId) redirect(`/championships/${leagueId}`);

  redirect(`/profile/${invite.user?.name}`);
};

export const acceptInvite = async (userEmail: string, inviteId: string) => {
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!user) return { error: "Coś poszło nie tak" };

  const invite = await prisma.invite.findUnique({ where: { id: inviteId } });

  if (!invite) return { error: "Coś poszło nie tak" };

  if (!(await isInviteReciever(inviteId)))
    return { error: "Coś poszło nie tak" };

  if (user.email && invite.raceId) {
    await prisma.race.update({
      where: { id: invite.raceId },
      data: { participants: { push: user.id } },
    });
    await deleteInvite(inviteId, invite.raceId);
  } else if (invite.leagueId && user.email) {
    await prisma.leagueParticipant.create({
      data: { userId: user.id, leagueId: invite.leagueId },
    });

    await prisma.race.updateMany({
      where: { AND: [{ leagueId: invite.leagueId }, { status: "BEFORE" }] },
      data: { participants: { push: user.id } },
    });

    await deleteInvite(inviteId, undefined, invite.leagueId);
  } else {
    await deleteInvite(inviteId);
  }
};
