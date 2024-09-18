"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function isValidObjectId(id: string) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

export async function isAuthor(authorEmail: string) {
  if (!authorEmail) return;

  const session = await getServerSession(authOptions);

  if (!session) return false;

  if (authorEmail !== session.user?.email) return false;

  return true;
}

export async function isReciever(reciever: string) {
  const session = await getServerSession(authOptions);

  if (!session) return false;

  if (reciever !== session.user?.email) return false;

  return true;
}
