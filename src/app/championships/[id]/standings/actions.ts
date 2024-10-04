"use server";

import { cache } from "react";
import prisma from "@/lib/db/prisma";
import { getParticipantsNames } from "@/src/components/organisms/RaceResultDialog/actions";
import { isLeagueAuthor, isValidObjectId } from "@/src/actions/actions";

type Driver = {
  driver: string;
  points: number;
};

const f1Points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export const getParticipantPoints = async (leagueId: string) => {
  if (!(await isValidObjectId(leagueId))) return;

  const races = await prisma.race.findMany({
    where: { leagueId },
    select: { results: true },
  });

  const result: Driver[][] = [];

  for (let i = 0; i < races.length; i++) {
    let results = assignPoints(races[i].results);
    result.push(results);
  }

  let participantsWithPoints = mergeResults(result).sort(
    (a, b) => Number(b.points) - Number(a.points)
  );

  let participantMails = Object.entries(participantsWithPoints).map(
    ([index, name]) => name.driver
  );

  const participantsNames = await getParticipantsNames(participantMails ?? []);

  let pariticipantsladeboard = participantsWithPoints.map((driver) => {
    let name = participantsNames[driver.driver];
    return {
      ...driver,
      driver: name,
    };
  });

  return pariticipantsladeboard;
};

const assignPoints = (results: string[]) => {
  return results.map((driver, index) => {
    let points = f1Points[index] | 0;
    return {
      driver: driver,
      points: points,
    };
  });
};

const mergeResults = (results: Driver[][]): Driver[] => {
  let pointsMap: { [key: string]: number } = {};

  results.forEach((team) => {
    team.forEach(({ driver, points }) => {
      if (pointsMap[driver]) {
        pointsMap[driver] += points;
      } else {
        pointsMap[driver] = points;
      }
    });
  });

  return Object.entries(pointsMap).map(([driver, points]) => ({
    driver,
    points,
  }));
};
