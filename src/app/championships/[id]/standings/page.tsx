import { notFound } from "next/navigation";
import { getParticipantPoints } from "./actions";

type StandingsPageProps = {
  params: {
    id: string;
  };
};

const StandingsPage: React.FC<StandingsPageProps> = async ({
  params: { id },
}) => {
  const participants = await getParticipantPoints(id);

  if (!participants) notFound();

  return (
    <div>
      {participants.map((u) => (
        <p key={u.driver}>
          {u.driver} has {u.points} points
        </p>
      ))}
    </div>
  );
};

export default StandingsPage;
