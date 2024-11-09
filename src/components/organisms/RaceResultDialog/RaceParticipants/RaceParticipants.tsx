"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import ParticipantBox from "@/src/components/atoms/PatricipantBox/PatricipantBox";
import { useRef, useState } from "react";
import { Reorder } from "framer-motion";

interface RaceParticipantsProps {
  raceId: string;
  participantsList: string[];
  setResults: (raceID: string, participants: string[]) => Promise<void>;
}

const RaceParticipants: React.FC<RaceParticipantsProps> = ({
  raceId,
  participantsList,
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
            <ParticipantBox position={index + 1}>{participant}</ParticipantBox>
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
