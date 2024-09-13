"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

const { ObjectId } = require("mongodb");

export async function isValidObjectId(id: string) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

export async function isAuthor(author: string) {
  if (!author) return;

  const session = await getServerSession(authOptions);

  if (!session) return false;

  if (author !== session.user?.email) return false;

  return true;
}

export async function isReciever(reciever: string) {
  const session = await getServerSession(authOptions);

  if (!session) return false;

  if (reciever !== session.user?.email) return false;

  return true;
}
