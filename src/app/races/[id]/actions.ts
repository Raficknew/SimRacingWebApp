"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";

export const DeleteRace = async (raceID: string) => {
  await prisma.race.delete({ where: { id: raceID } });
  revalidatePath("/races/[id]");
  redirect("/");
};

export const CreateInvite = async (userEmail: string, raceId: string) => {
  const race = await prisma.race.findUnique({ where: { id: raceId } });

  const isUserInEvent = race?.participants.includes(userEmail);

  if (!isUserInEvent) {
    await prisma.invite.create({
      data: {
        userEmail,
        raceId,
      },
    });
  }

  revalidatePath("/races/[id]");
};
