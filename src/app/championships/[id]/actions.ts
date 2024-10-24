"use server";

import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";
import { isLeagueAuthor, isValidObjectId } from "@/src/actions/actions";
import { revalidatePath } from "next/cache";

export const getChampionship = cache(async (id: string) => {
  if (!(await isValidObjectId(id))) notFound();

  const championship = await prisma.league.findUnique({
    where: { id: id },
    include: {
      participants: { include: { user: true } },
      races: {
        include: { author: { select: { name: true, image: true } } },
        orderBy: { raceDate: "asc" },
      },
    },
  });

  if (!championship) notFound();

  return championship;
});

export const getChampionshipAuthor = cache(async (id: string) => {
  const author = await prisma.league.findUnique({
    where: { id },
    include: { author: { select: { name: true, email: true } } },
  });

  return author;
});

export const deleteLeague = cache(async (leagueId: string) => {
  if (!(await isValidObjectId(leagueId))) notFound();

  const league = prisma.league.findUnique({ where: { id: leagueId } });

  if (!league) return;

  if (!(await isLeagueAuthor(leagueId))) return;

  await prisma.league.delete({ where: { id: leagueId } });

  revalidatePath("/championships");
  redirect("/championships");
});

export const createInviteToLeague = cache(
  async (userEmail: string, id: string) => {
    if (!(await isValidObjectId(id))) notFound();

    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) return;

    const league = await prisma.league.findUnique({
      where: { id: id },
      include: {
        invites: true,
        participants: { select: { user: { select: { name: true } } } },
      },
    });

    if (!league) return;

    const isUserInvited = league?.invites.some(
      (invite) => invite.userEmail === userEmail
    );

    if (isUserInvited) return;

    const isUserInLeague = league.participants.some(
      (participant) => participant.user.name === user.name
    );

    if (isUserInLeague) return;

    await prisma.invite.create({
      data: { userEmail: userEmail, leagueId: league.id },
    });

    revalidatePath(`/championships/${id}`);
    redirect(`/championships/${id}`);
  }
);
