"use server";

import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";
import { isValidObjectId } from "@/src/actions/actions";

export const getChampionship = cache(async (id: string) => {
  if (!(await isValidObjectId(id))) notFound();

  const championship = await prisma.league.findUnique({
    where: { id: id },
    include: {
      races: {
        include: { user: { select: { name: true, image: true } } },
        orderBy: { raceDate: "asc" },
      },
    },
  });

  if (!championship) notFound();

  return championship;
});

export const getChampionshipAuthor = cache(async (id: string) => {
  const author = await prisma.league.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true } } },
  });

  return author;
});
