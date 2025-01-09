"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import { ObjectId } from "mongodb";

export async function isValidObjectId(id: string) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}

export async function isRaceAuthor(raceId: string) {
  if (!raceId) return false;

  const race = await prisma?.race.findUnique({
    where: { id: raceId },
    include: { author: { select: { email: true } } },
  });

  if (!race) return false;

  const session = await getServerSession(authOptions);

  if (!session) return false;

  if (race.author.email !== session.user?.email) return false;

  return true;
}

export async function isLeagueAuthor(leagueId: string) {
  if (!leagueId) return false;

  const league = await prisma?.league.findUnique({
    where: { id: leagueId },
    include: { author: { select: { email: true } } },
  });

  if (!league) return false;

  const session = await getServerSession(authOptions);

  if (!session) return false;

  if (league.author.email !== session.user?.email) return false;

  return true;
}

export async function isInviteReciever(inviteId: string) {
  if (!inviteId) return false;

  const invite = await prisma?.invite.findUnique({
    where: { id: inviteId },
  });

  if (!invite) return false;

  const session = await getServerSession(authOptions);

  if (!session) return false;

  if (invite.userEmail !== session.user?.email) return false;

  return true;
}
