"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";
import { isRaceAuthor, isValidObjectId } from "@/src/actions/actions";
import { RaceStatus } from "@prisma/client";
import { deleteInvite } from "../../profile/actions";

export const deleteRace = async (raceId: string) => {
  if (!(await isValidObjectId(raceId))) notFound();

  const race = await prisma.race.findUnique({
    where: { id: raceId },
    include: {
      author: { select: { email: true } },
      league: { select: { id: true } },
    },
  });

  if (!race) return;

  if (!(await isRaceAuthor(raceId))) return;

  await prisma.race.delete({ where: { id: raceId } });

  if (!race.league?.id) {
    revalidatePath("/");
    redirect("/");
  }

  revalidatePath(`/championships/${race.league.id}`);
  redirect(`/championships/${race.league.id}`);
};

export const getRace = cache(async (id: string) => {
  if (!(await isValidObjectId(id))) notFound();

  const race = await prisma.race.findUnique({
    where: { id },
    include: {
      author: true,
      invites: { include: { user: true } },
      league: { select: { name: true } },
    },
  });
  if (!race) notFound();
  return race;
});

export const createInviteToRace = cache(
  async (userEmail: string, raceId: string, userName?: string) => {
    const race = await prisma.race.findUnique({
      where: { id: raceId },
      include: {
        invites: { select: { userEmail: true, userName: true } },
        author: { select: { email: true } },
      },
    });

    if (!race) return;

    if (!(await isRaceAuthor(race.id))) return;

    const isUserInvited = race?.invites.some(
      (invite) => invite.userEmail === userEmail || invite.userName === userName
    );

    if (isUserInvited) return;

    const isUserInEvent = race?.participants.includes(userEmail);

    if (isUserInEvent) return;

    await prisma.invite.create({
      data: {
        userEmail,
        raceId,
        userName,
      },
    });

    revalidatePath(`/races/${raceId}`);
    redirect(`/races/${raceId}`);
  }
);

export const changeStatus = async (raceId: string) => {
  if (!raceId) return;

  if (!(await isValidObjectId(raceId))) notFound();

  const race = await prisma.race.findUnique({
    where: { id: raceId },
    include: {
      author: { select: { email: true } },
      league: { select: { id: true } },
    },
  });

  if (!race) return;

  if (race.status === RaceStatus.ENDED) return;

  if (!(await isRaceAuthor(raceId))) return;

  if (race.status === RaceStatus.BEFORE) {
    await prisma.race.update({
      where: { id: raceId },
      data: { status: RaceStatus.ONGOING },
    });
  } else {
    await prisma.race.update({
      where: { id: raceId },
      data: { status: RaceStatus.ENDED },
    });
  }

  revalidatePath(`/races/${raceId}`);
  redirect(`/races/${raceId}`);
};

export const DeleteParticipantFromRace = cache(
  async (raceID: string, participantID: string) => {
    if (!raceID) return;

    if (!(await isValidObjectId(raceID))) notFound();
    if (!(await isValidObjectId(participantID))) notFound();

    const race = await prisma.race.findUnique({
      where: { id: raceID },
      include: {
        author: { select: { email: true } },
      },
    });

    if (!race) return;

    if (race.status === RaceStatus.ENDED || race.status === RaceStatus.ONGOING)
      return;

    if (!(await isRaceAuthor(raceID))) return;

    race.participants = race.participants.filter((p) => p !== participantID);

    await prisma.race.update({
      where: { id: raceID },
      data: {
        participants: { set: race.participants },
      },
    });

    revalidatePath(`/races/${raceID}`);
    redirect(`/races/${raceID}`);
  }
);

export const DeleteInvitedParticipant = cache(
  async (raceID: string, inviteID: string) => {
    if (!(await isValidObjectId(raceID))) notFound();
    if (!(await isValidObjectId(inviteID))) notFound();

    const race = await prisma.race.findUnique({
      where: { id: raceID },
      include: {
        author: { select: { email: true } },
      },
    });

    if (!race) return;

    if (race.status === RaceStatus.ENDED || race.status === RaceStatus.ONGOING)
      return;

    if (!(await isRaceAuthor(raceID))) return;

    await prisma.invite.delete({ where: { id: inviteID } });

    revalidatePath(`/races/${raceID}`);
    redirect(`/races/${raceID}`);
  }
);
