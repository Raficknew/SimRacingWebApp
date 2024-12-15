"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import ParticipantBox from "@/src/components/atoms/Patricipant/Patricipant";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { User } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
        {participants.map((participant, index) =>
          participant in participantNames ? (
            <Reorder.Item key={participant} value={participant}>
              <ParticipantBox position={index + 1}>
                <div className="flex justify-center items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        Object.entries(participantNames).find(
                          (u) => u[1]?.id == participant
                        )?.[1]?.image || ""
                      }
                    />
                  </Avatar>
                  {
                    Object.entries(participantNames).find(
                      (u) => u[1]?.id == participant
                    )?.[1]?.name
                  }
                </div>
              </ParticipantBox>
            </Reorder.Item>
          ) : (
            <Reorder.Item key={participant} value={participant}>
              <ParticipantBox position={index + 1}>
                {participant}
              </ParticipantBox>
            </Reorder.Item>
          )
        )}
      </Reorder.Group>
      <DialogFooter>
        <Button onClick={() => setResults(raceId, participants)}>Zapisz</Button>
      </DialogFooter>
    </>
  );
};

export default RaceParticipants;
