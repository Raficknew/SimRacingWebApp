"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { cache } from "react";
import { isRaceAuthor, isValidObjectId } from "@/src/actions/actions";
import { RaceStatus } from "@prisma/client";
import { error } from "console";

export const deleteRace = async (raceId: string) => {
  if (!(await isValidObjectId(raceId))) notFound();

  const race = await prisma.race.findUnique({
    where: { id: raceId },
    include: {
      author: { select: { email: true } },
      league: { select: { id: true } },
    },
  });

  if (!race) return { error: "Coś poszło nie tak" };

  if (!(await isRaceAuthor(raceId))) return { error: "Coś poszło nie tak" };

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

    if (!race) return { error: "Coś poszło nie tak" };

    if (!(await isRaceAuthor(race.id))) return { error: "Coś poszło nie tak" };

    const isUserInvited = race.invites.some(
      (invite) => invite.userEmail === userEmail || invite.userName === userName
    );

    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    let isUserInEvent = false;

    if (user) {
      isUserInEvent = race.participants.includes(user.id);
    }

    if (isUserInvited || isUserInEvent)
      return { error: "Użytkownik jest już w wyścigu" };

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
  if (!raceId) return { error: "Coś poszło nie tak" };

  if (!(await isValidObjectId(raceId))) notFound();

  const race = await prisma.race.findUnique({
    where: { id: raceId },
    include: {
      author: { select: { email: true } },
      league: { select: { id: true } },
    },
  });

  if (!race) return { error: "Coś poszło nie tak" };

  if (race.status === RaceStatus.ENDED) return { error: "Coś poszło nie tak" };

  if (!(await isRaceAuthor(raceId))) return { error: "Coś poszło nie tak" };

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
    if (!raceID || !participantID) return { error: "Coś poszło nie tak" };

    if (
      !(await isValidObjectId(raceID)) ||
      !(await isValidObjectId(participantID))
    )
      notFound();

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
    if (!raceID || !inviteID) return { error: "Coś poszło nie tak" };
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
