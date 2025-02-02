"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteLeagueButtonProps {
  leagueId: string;
  deleteLeague: (leagueId: string) => Promise<{ error: string } | void>;
}

const DeleteLeagueButton: React.FC<DeleteLeagueButtonProps> = ({
  deleteLeague,
  leagueId,
}) => {
  async function handleDeleteLeague() {
    const result = await deleteLeague(leagueId);

    result?.error
      ? toast.error(result.error)
      : toast.success("Liga została usunięta");
  }

  return (
    <Button
      className="bg-red-900 hover:bg-red-950 flex justify-center items-center gap-2"
      onClick={handleDeleteLeague}
    >
      <Trash width={20} height={20} /> Usuń
    </Button>
  );
};

export default DeleteLeagueButton;
