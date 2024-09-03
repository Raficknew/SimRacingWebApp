"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";

export const DeleteInvite = async (inviteId: string) => {
  await prisma.invite.delete({ where: { id: inviteId } });
  revalidatePath("/");
  redirect("/");
};

export const AcceptInvite = async () => {};
