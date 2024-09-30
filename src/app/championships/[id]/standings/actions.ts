"use server";

import { cache } from "react";
import prisma from "@/lib/db/prisma";

export const getParticipants = cache(async (leagueId: string) => {
  const participants = await prisma.leagueParticipant.findMany({
    where: { leagueId: leagueId },
    include: { user: { select: { id: true, name: true } } },
  });

  return participants;
});
