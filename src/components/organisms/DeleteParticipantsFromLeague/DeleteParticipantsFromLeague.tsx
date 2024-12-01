import {
  DeleteParticipantFromLeagueAction,
  getChampionship,
} from "@/src/app/championships/[id]/actions";
import DeleteParticipantFromLeagueButon from "./DeleteParticipantFromLeagueButton/DeleteParticipantFromLeagueButton";

interface DeleteParticipantFromLeagueProps {
  championshipId: string;
}

const DeleteParticipantFromLeague: React.FC<
  DeleteParticipantFromLeagueProps
> = async ({ championshipId }) => {
  const championship = await getChampionship(championshipId);
  return (
    <div>
      <p>Zarządzaj kierowcami</p>
      <div className="flex flex-col gap-2">
        {championship.participants.map((p) => (
          <div key={p.id}>
            <DeleteParticipantFromLeagueButon
              participant={p.user}
              championshipID={championship.id}
              DeleteParticipantFromLeague={DeleteParticipantFromLeagueAction}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteParticipantFromLeague;
