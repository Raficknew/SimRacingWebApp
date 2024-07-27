"use Client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteRaceButtonProps {
  raceID: string;
}

const DeleteRace = async (raceID: string) => {
  "use server";
  console.log(raceID);
};

const DeleteRaceButton: React.FC<DeleteRaceButtonProps> = ({ raceID }) => {
  return (
    <Button
      onClick={() => DeleteRace(raceID)}
      className="bg-red-400 text-white cursor-pointer hover:bg-red-500"
    >
      <Trash className="w-4 h-4" />
    </Button>
  );
};

export default DeleteRaceButton;
