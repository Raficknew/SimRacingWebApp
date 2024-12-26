"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { User } from "@prisma/client";
import DraggableParticipant from "./DraggableParticipant/DraggableParticipant";

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
        <Button onClick={() => setResults(raceId, participants)}>Zapisz</Button>
      </DialogFooter>
    </>
  );
};

export default RaceParticipants;
