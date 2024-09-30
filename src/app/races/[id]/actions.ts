"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";
import { isRaceAuthor, isValidObjectId } from "@/src/actions/actions";

export const deleteRace = async (raceID: string) => {
  if (!(await isValidObjectId(raceID))) notFound();

  const race = await prisma.race.findUnique({
    where: { id: raceID },
    include: {
      author: { select: { email: true } },
      league: { select: { id: true } },
    },
  });

  if (!race) return;

  if (!(await isRaceAuthor(raceID))) return;

  await prisma.race.delete({ where: { id: raceID } });

  if (!race.league?.id) {
    revalidatePath("/");
    redirect("/");
  }

  revalidatePath(`/championships/${race.league.id}`);
  redirect(`/championships/${race.league.id}`);
};

export const getRace = cache(async (id: string) => {
  if (!(await isValidObjectId(id))) notFound();

  const race = await prisma.race.findUnique({
    where: { id },
    include: { author: true },
  });
  if (!race) notFound();
  return race;
});

export const createInviteToRace = cache(
  async (userEmail: string, raceId: string) => {
    const race = await prisma.race.findUnique({
      where: { id: raceId },
      include: {
        invites: { select: { userEmail: true } },
        author: { select: { email: true } },
      },
    });

    if (!race) return;

    if (!(await isRaceAuthor(race.id))) return;

    const isUserInvited = race?.invites.some(
      (invite) => invite.userEmail === userEmail
    );

    if (isUserInvited) return;

    const isUserInEvent = race?.participants.includes(userEmail);

    if (isUserInEvent) return;

    await prisma.invite.create({
      data: {
        userEmail,
        raceId,
      },
    });

    revalidatePath(`/races/${raceId}`);
    redirect(`/races/${raceId}`);
  }
);
