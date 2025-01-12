"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteLeagueButtonProps {
  leagueId: string;
  deleteLeague: (leagueId: string) => Promise<{ error: string } | undefined>;
}

const DeleteLeagueButton: React.FC<DeleteLeagueButtonProps> = ({
  deleteLeague,
  leagueId,
}) => {
  async function handleDeleteLeague() {
    const result = await deleteLeague(leagueId);

    result?.error
      ? toast.error(result.error, { richColors: true, duration: 2000 })
      : toast.success("Liga została usunięta", {
          richColors: true,
          duration: 2000,
        });
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
