"use client";
import { Button } from "@/components/ui/button";

interface EndRaceButtonProps {
  raceID: string;
  EndRace: (raceID: string) => Promise<void>;
}

const EndRaceButton: React.FC<EndRaceButtonProps> = ({ raceID, EndRace }) => {
  return (
    <Button onClick={async () => await EndRace(raceID)}>Zakończ wyścig</Button>
  );
};

export default EndRaceButton;
