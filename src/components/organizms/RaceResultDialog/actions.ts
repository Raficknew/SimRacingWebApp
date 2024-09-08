"use server";
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getRace = cache(async (id: string) => {
  const race = await prisma.race.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!race) notFound;
  return race;
});

export const getParticipant = cache(async (mail: string) => {
  const user = await prisma.user.findUnique({ where: { email: mail } });

  if (!user) notFound;

  const participant = user?.name;
  return participant;
});
