"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface DeleteLeagueButtonProps {
  leagueId: string;
  deleteLeague: (leagueId: string) => Promise<void>;
}

const DeleteLeagueButton: React.FC<DeleteLeagueButtonProps> = ({
  deleteLeague,
  leagueId,
}) => {
  return (
    <Button
      className="bg-red-900 hover:bg-red-950 flex justify-center items-center gap-2"
      onClick={() => deleteLeague(leagueId)}
    >
      <Trash width={20} height={20} /> Usuń
    </Button>
  );
};

export default DeleteLeagueButton;
