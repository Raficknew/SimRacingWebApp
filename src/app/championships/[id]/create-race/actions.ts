"use server";

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import {
  RaceFormSchema,
  RaceFormType,
} from "@/src/components/organisms/RaceForm/r";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const createLeagueRace = async (
  raceData: RaceFormType,
  leagueId: string
) => {
  if (!RaceFormSchema.safeParse(raceData).success) return;

  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin?callbackUrl=/");

  const useremail = session.user?.email;

  if (!useremail) return;

  const user = await prisma.user.findUnique({
    where: { email: useremail },
  });

  if (!user || !raceData) return;

  const leagueParticipants = await prisma.leagueParticipant.findMany({
    where: { leagueId: leagueId },
    include: { user: { select: { id: true } } },
  });

  const participantsIds = leagueParticipants
    .map((p) => p.user.id)
    .filter((id): id is string => id !== null);

  await prisma.race.create({
    data: {
      ...raceData,
      userId: user.id,
      leagueId: leagueId,
      participants: participantsIds,
    },
  });

  revalidatePath("/races/create-race");
  redirect(`/championships/${leagueId}`);
};
