"use server";

import { cache } from "react";
import prisma from "@/lib/db/prisma";
import { isValidObjectId } from "@/src/actions/actions";
import { getChampionship } from "../actions";
import { getParticipantsNames } from "@/src/components/organisms/RaceResultDialog/actions";

type Driver = {
  driver: string;
  points: number;
};

const f1Points = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

export const getParticipantPoints = cache(async (leagueId: string) => {
  if (!(await isValidObjectId(leagueId))) return;

  const championship = await getChampionship(leagueId);

  if (!championship) return;

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

  console.log(participantsWithPoints);

  return participantsWithPoints;
});

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

  results.forEach((race) => {
    race.forEach(({ driver, points }) => {
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
