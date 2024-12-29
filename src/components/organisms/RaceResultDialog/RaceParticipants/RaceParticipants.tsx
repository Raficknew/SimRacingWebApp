"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { User } from "@prisma/client";
import DraggableParticipant from "./DraggableParticipant/DraggableParticipant";
import { DialogClose } from "@radix-ui/react-dialog";

interface RaceParticipantsProps {
  raceId: string;
  participantsList: string[];
  participantNames: Record<string, User | null>;
  setResults: (raceID: string, participants: string[]) => Promise<void>;
}

const RaceParticipants: React.FC<RaceParticipantsProps> = ({
  raceId,
  participantsList,
  participantNames,
  setResults,
}) => {
  const [participants, SetParticipants] = useState(participantsList);

  return (
    <>
      <Reorder.Group
        className="flex flex-col gap-1"
        axis="y"
        values={participants}
        onReorder={SetParticipants}
      >
        {participants.map((participant, index) => (
          <Reorder.Item key={participant} value={participant}>
            <DraggableParticipant
              classname={
                {
                  1: "text-yellow-200 shadow",
                  2: "text-gray-300 shadow",
                  3: "text-amber-700 shadow",
                }[index + 1] || "text-gray-500"
              }
              name={
                Object.entries(participantNames).find(
                  (u) => u[1]?.id == participant
                )?.[1]?.name ?? participant
              }
              avatar={
                Object.entries(participantNames).find(
                  (u) => u[1]?.id == participant
                )?.[1]?.image || ""
              }
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <DialogFooter>
        <DialogClose>
          <Button
            className="bg-red-900 text-white cursor-pointer hover:bg-red-950 "
            onClick={() => setResults(raceId, participants)}
          >
            Zapisz
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default RaceParticipants;
