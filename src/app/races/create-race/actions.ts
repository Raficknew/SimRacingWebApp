"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import {
  RaceFormSchema,
  RaceFormType,
} from "@/src/components/organisms/RaceForm/r";
import { revalidatePath } from "next/cache";

export async function createRace(raceData: RaceFormType) {
  if (!RaceFormSchema.safeParse(raceData).success) return;

  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin?callbackUrl=/races/create-race");

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
    },
  });

  revalidatePath("/races/create-race");
  redirect("/");

  // ! toast to add
}
