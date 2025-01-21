"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type DeleteRaceButtonProps = {
  raceID: string;
  deleteRace: (raceID: string) => Promise<{ error: string } | void>;
};

const DeleteRaceButton: React.FC<DeleteRaceButtonProps> = ({
  raceID,
  deleteRace,
}) => {
  async function handleDeleteRace() {
    const result = await deleteRace(raceID);

    result?.error
      ? toast.warning(result.error)
      : toast.success("Wyścig został usunięty");
  }
  return (
    <Button
      onClick={handleDeleteRace}
      className="bg-red-900 text-white cursor-pointer hover:bg-red-950 flex gap-2"
    >
      <Trash className="w-4 h-4" />
      <p>Usuń Wyścig</p>
    </Button>
  );
};

export default DeleteRaceButton;
