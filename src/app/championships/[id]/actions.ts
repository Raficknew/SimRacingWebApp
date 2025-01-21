"use server";

import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
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
    select: { author: { select: { name: true, email: true, image: true } } },
  });

  return author;
});

export const deleteLeague = cache(async (leagueId: string) => {
  if (!(await isValidObjectId(leagueId))) notFound();
  if (!(await isLeagueAuthor(leagueId))) return { error: "Coś poszło nie tak" };

  const league = prisma.league.findUnique({ where: { id: leagueId } });

  if (!league) return { error: "Coś poszło nie tak" };

  await prisma.league.delete({ where: { id: leagueId } });

  revalidatePath("/championships");
  redirect("/championships");
});

export const createInviteToLeague = cache(
  async (userEmail: string, id: string) => {
    if (!(await isValidObjectId(id))) notFound();
    if (!(await isLeagueAuthor(id))) return { error: "Coś poszło nie tak" };

    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) return { error: "Coś poszło nie tak" };

    const league = await prisma.league.findUnique({
      where: { id: id },
      include: {
        invites: true,
        participants: { select: { user: { select: { name: true } } } },
      },
    });

    if (!league) return { error: "Coś poszło nie tak" };

    const isUserInvited = league?.invites.some(
      (invite) => invite.userEmail === userEmail
    );

    const isUserInLeague = league.participants.some(
      (participant) => participant.user.name === user.name
    );

    if (isUserInvited || isUserInLeague)
      return { error: "Użytkownik jest już w lidze" };

    await prisma.invite.create({
      data: { userEmail: userEmail, leagueId: league.id },
    });

    revalidatePath(`/championships/${id}`);
    redirect(`/championships/${id}`);
  }
);

export const DeleteParticipantFromLeagueAction = cache(
  async (participantID: string, leagueID: string) => {
    if (!participantID) return;
    if (!leagueID) return;

    if (!(await isValidObjectId(participantID))) notFound();
    if (!(await isValidObjectId(leagueID))) notFound();
    if (!(await isLeagueAuthor(leagueID))) return;

    const participant = await prisma.leagueParticipant.findFirst({
      where: {
        user: { id: participantID },
        league: { id: leagueID },
      },
    });

    if (!participant) return;

    await prisma.leagueParticipant.delete({
      where: { id: participant.id },
    });

    const league = await prisma.league.findUnique({
      where: { id: leagueID },
      include: {
        participants: { include: { user: { select: { id: true } } } },
      },
    });

    const participants = league?.participants.map((p) => p.user.id);

    await prisma.race.updateMany({
      where: {
        leagueId: leagueID,
        AND: {
          results: { isEmpty: true },
        },
      },
      data: { participants: { set: participants } },
    });

    revalidatePath(`/championships/${leagueID}`);
    redirect(`/championships/${leagueID}`);
  }
);
