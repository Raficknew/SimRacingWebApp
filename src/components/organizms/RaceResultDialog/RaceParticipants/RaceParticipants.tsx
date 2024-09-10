"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useRef, useState } from "react";

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
  const dragParticipant = useRef<number>(0);
  const dragOverParticipant = useRef<number>(0);

  function handleSort() {
    const participantsClone = [...participants];

    const draggedParticipant = participantsClone.splice(
      dragParticipant.current,
      1
    )[0];

    participantsClone.splice(
      dragOverParticipant.current,
      0,
      draggedParticipant
    );

    SetParticipants(participantsClone);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {participants.map((participant, index) => (
          <div
            className="flex flex-1 justify-between w-full bg-gray-300"
            key={index.toString()}
            draggable
            onDragStart={() => (dragParticipant.current = index)}
            onDragEnter={() => (dragOverParticipant.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>{index + 1}</p>
            <p>{participant}</p>
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button onClick={() => setResults(raceId, participantsList)}>
          Zapisz
        </Button>
      </DialogFooter>
    </>
  );
};

export default RaceParticipants;
