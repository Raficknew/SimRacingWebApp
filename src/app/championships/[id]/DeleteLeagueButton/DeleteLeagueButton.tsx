"use client";
import { Button } from "@/components/ui/button";

interface DeleteLeagueButtonProps {
  leagueId: string;
  deleteLeague: (leagueId: string) => Promise<void>;
}

const DeleteLeagueButton: React.FC<DeleteLeagueButtonProps> = ({
  deleteLeague,
  leagueId,
}) => {
  return <Button onClick={() => deleteLeague(leagueId)}>Usuń</Button>;
};

export default DeleteLeagueButton;
