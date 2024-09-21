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

export const CreateLeagueRace = async (
  raceData: RaceFormType,
  leagueId: string
) => {
  if (!RaceFormSchema.safeParse(raceData).success) return;

  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin?callbackUrl=/create-event");

  const useremail = session.user?.email;

  if (!useremail) return;

  const user = await prisma.user.findUnique({
    where: { email: useremail },
  });

  if (!user) return;
  if (!raceData) return;

  await prisma.race.create({
    data: {
      ...raceData,
      userId: user.id,
      leagueId: leagueId,
    },
  });

  revalidatePath("/races/create-race");
  redirect(`/championships/${leagueId}`);
};
