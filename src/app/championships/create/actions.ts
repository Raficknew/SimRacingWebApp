"use server";

import {
  leagueFormSchema,
  leagueFormType,
} from "@/src/components/organisms/LeagueForm/l";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const createLeague = async (leagueData: leagueFormType) => {
  if (!leagueFormSchema.safeParse(leagueData).success)
    return { error: "Coś poszło nie tak" };
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin?callbackUrl=/championships/create");

  const useremail = session.user?.email;

  if (!useremail) return { error: "Coś poszło nie tak" };

  const user = await prisma.user.findUnique({
    where: { email: useremail },
  });

  if (!user || !leagueData) return { error: "Coś poszło nie tak" };

  const league = await prisma.league.create({
    data: {
      ...leagueData,
      authorId: user.id,
    },
  });

  await prisma.leagueParticipant.create({
    data: {
      leagueId: league.id,
      userId: user.id,
    },
  });

  revalidatePath("/championships/create");
  redirect(`/championships`);
};
