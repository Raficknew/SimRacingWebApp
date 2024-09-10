"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";

export const DeleteRace = async (raceID: string) => {
  await prisma.race.delete({ where: { id: raceID } });
  revalidatePath("/races/[id]");
  redirect("/");
};

const getRace = cache(async (id: string) => {
  const race = await prisma.race.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!race) notFound;
  return race;
});

export const CreateInvite = async (userEmail: string, raceId: string) => {
  const race = await prisma.race.findUnique({ where: { id: raceId } });

  const isUserInEvent = race?.participants.includes(userEmail);

  if (isUserInEvent) return;

  await prisma.invite.create({
    data: {
      userEmail,
      raceId,
    },
  });

  revalidatePath("/races/[id]");
};
