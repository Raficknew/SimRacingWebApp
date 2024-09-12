"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";

export const DeleteRace = async (raceID: string) => {
  await prisma.race.delete({ where: { id: raceID } });
  revalidatePath(`/races/${raceID}`);
  redirect("/");
};

export const getRace = cache(async (id: string) => {
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
    include: { invites: { select: { userEmail: true } } },
  });

  race?.invites.userEmail;

  await prisma.invite.create({
    data: {
      userEmail,
      raceId,
    },
  });

  revalidatePath(`/races/${raceId}`);
});
