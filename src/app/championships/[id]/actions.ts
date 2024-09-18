"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";
import { isValidObjectId } from "@/src/actions/actions";

export const getChampionship = cache(async (id: string) => {
  if (!(await isValidObjectId(id))) notFound();

  const championship = await prisma.league.findUnique({
    where: { id: id },
    include: {
      races: { include: { user: true }, orderBy: { raceDate: "asc" } },
    },
  });

  if (!championship) notFound();

  return championship;
});
