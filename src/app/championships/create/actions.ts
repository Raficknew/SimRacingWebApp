"use server";

import {
  leagueFormSchema,
  leagueFormType,
} from "@/src/components/organisms/LeagueForm/l";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const createLeague = async (leagueData: leagueFormType) => {
  if (!leagueFormSchema.safeParse(leagueData).success) return;
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin?callbackUrl=/championships/create");

  const useremail = session.user?.email;

  if (!useremail) return;

  const user = await prisma.user.findUnique({
    where: { email: useremail },
  });

  if (!user) return;
  if (!leagueData) return;

  await prisma.league.create({
    data: {
      ...leagueData,
      authorId: user.id,
    },
  });

  revalidatePath("/championships/create");
  redirect(`/championships`);
};
