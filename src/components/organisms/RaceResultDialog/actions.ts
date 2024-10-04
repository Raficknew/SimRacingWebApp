"use server";
import prisma from "@/lib/db/prisma";
import { isRaceAuthor } from "@/src/actions/actions";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

export const getRace = cache(async (id: string) => {
  const race = await prisma.race.findUnique({
    where: { id },
  });
  if (!race) notFound;
  return race;
});

export const getParticipantsNames = cache(async (mails: string[]) => {
  const users = await prisma.user.findMany({ where: { email: { in: mails } } });

  let response: Record<string, string | null> = {};

  for (const mail of mails) {
    response[mail] = users.find((u) => u.email === mail)?.name ?? null;
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
