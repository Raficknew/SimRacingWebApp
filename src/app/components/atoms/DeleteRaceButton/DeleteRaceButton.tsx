"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type DeleteRaceButtonProps = {
  raceID: string;
  DeleteRace: (raceID: string) => Promise<void>;
};

const DeleteRaceButton: React.FC<DeleteRaceButtonProps> = ({
  raceID,
  DeleteRace,
}) => {
  return (
    <Button
      onClick={async () => await DeleteRace(raceID)}
      className="bg-red-400 text-white cursor-pointer hover:bg-red-500"
    >
      <Trash className="w-4 h-4" />
    </Button>
  );
};

export default DeleteRaceButton;
