"use client";
import { Button } from "@/components/ui/button";

interface ChangeStatusForRaceButtonProps {
  raceID: string;
  ChangeStatus: (raceID: string) => Promise<void>;
}

const ChangeStatusForRaceButton: React.FC<ChangeStatusForRaceButtonProps> = ({
  raceID,
  ChangeStatus,
}) => {
  return (
    <Button
      className="bg-[#303030] hover:bg-[#252525]"
      onClick={async () => await ChangeStatus(raceID)}
    >
      Zmień status wyścigu
    </Button>
  );
};

export default ChangeStatusForRaceButton;
