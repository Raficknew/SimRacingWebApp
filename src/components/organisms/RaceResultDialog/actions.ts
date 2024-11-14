"use server";
import prisma from "@/lib/db/prisma";
import { isRaceAuthor, isValidObjectId } from "@/src/actions/actions";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import type { User } from "@prisma/client";

export const getRace = cache(async (id: string) => {
  const race = await prisma.race.findUnique({
    where: { id },
    include: { invites: true },
  });
  if (!race) notFound;
  return race;
});

export const getParticipantsNames = cache(async (ids: string[]) => {
  const users = await prisma.user.findMany({ where: { id: { in: ids } } });

  let response: Record<string, User | null> = {};

  for (const id of ids) {
    response[id] = users.find((u) => u.id === id) ?? null;
  }

  return response;
});

export const setResults = async (raceID: string, participants: string[]) => {
  if (!(await isRaceAuthor(raceID))) return;

  await prisma.race.update({
    where: { id: raceID },
    data: { results: { set: participants } },
  });

  revalidatePath(`/races/${raceID}`);
  redirect(`/races/${raceID}`);
};
