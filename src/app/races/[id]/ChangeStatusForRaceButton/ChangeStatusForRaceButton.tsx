"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChangeStatusForRaceButtonProps {
  raceID: string;
  ChangeStatus: (raceID: string) => Promise<{ error: string } | void>;
}

const ChangeStatusForRaceButton: React.FC<ChangeStatusForRaceButtonProps> = ({
  raceID,
  ChangeStatus,
}) => {
  async function handleChangeStatus(raceID: string) {
    const result = await ChangeStatus(raceID);
    result?.error
      ? toast.error(result.error)
      : toast.success("Status wyścigu został zmieniony");
  }

  return (
    <Button
      className="bg-[#303030] hover:bg-[#252525]"
      onClick={() => handleChangeStatus(raceID)}
    >
      Zmień status wyścigu
    </Button>
  );
};

export default ChangeStatusForRaceButton;
