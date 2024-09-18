"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";
import { isAuthor, isValidObjectId } from "@/src/actions/actions";

export const DeleteRace = async (raceID: string) => {
  if (!(await isValidObjectId(raceID))) notFound();

  const race = await prisma.race.findUnique({
    where: { id: raceID },
    include: { user: { select: { email: true } } },
  });

  if (!race) return;

  if (!(await isAuthor(race.user?.email ?? ""))) return;

  await prisma.race.delete({ where: { id: raceID } });
  revalidatePath(`/races/${raceID}`);
  redirect("/");
};

export const getRace = cache(async (id: string) => {
  if (!(await isValidObjectId(id))) notFound();

  const race = await prisma.race.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!race) notFound();
  return race;
});

export const CreateInvite = cache(async (userEmail: string, raceId: string) => {
  const race = await prisma.race.findUnique({
    where: { id: raceId },
    include: {
      invites: { select: { userEmail: true } },
      user: { select: { email: true } },
    },
  });

  if (!race) return;

  if (!(await isAuthor(race.user?.email ?? ""))) return;

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
});
