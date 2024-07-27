"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const DeleteRace = async (raceID: string) => {
  await prisma?.race.delete({ where: { id: raceID } });
  revalidatePath("/races/[id]");
  redirect("/");
};
