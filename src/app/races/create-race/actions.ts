"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";

export async function createRace(
  name: string,
  description: string,
  circuit: string,
  series: string,
  raceDate: string,
  raceHour: string,
  status: string
) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin?callbackUrl=/create-event");

  const useremail = session.user?.email;

  if (!useremail) return;

  const user = await prisma.user.findUnique({
    where: { email: useremail },
  });

  if (!user) return;

  const userId = user.id;

  await prisma.race.create({
    data: {
      name,
      description,
      circuit,
      series,
      raceDate,
      raceHour,
      userId,
      status,
    },
  });

  redirect("/");

  // ! toast to add
}
