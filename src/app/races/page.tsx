import prisma from "@/lib/db/prisma";
import RaceCard from "../components/molecules/RaceCard/RaceCard";
import Navbar from "../components/organizms/Navbar/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const RaceFind = async () => {
  const races = await prisma.race.findMany({
    orderBy: { id: "desc" },
    include: {
      user: true,
    },
    where: { name: { startsWith: "" } },
  });

  let value: string;

  return (
    <div className="h-screen gap-20 flex flex-col">
      <Navbar />
      <div className="flex flex-col px-8 pt-5 gap-10">
        <Input type="search" className="flex w-1/3" placeholder="Search Race" />
        <ScrollArea className="w-[814px] h-[500px] flex self-strech items-center">
          {races.map((race) => (
            <RaceCard
              key={race.id}
              id={race.id}
              author={race.user?.name!}
              authorPicture={race.user?.image!}
              name={race.name}
              circuit={race.circuit}
              series={race.series}
              hour={race.raceHour}
              date={race.raceDate}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default RaceFind;
