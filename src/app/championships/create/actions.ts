"use server";

import { leagueFormType } from "@/src/components/organisms/LeagueForm/l";

export const createLeague = async (raceData: leagueFormType) => {
  console.log(raceData.name);
};
