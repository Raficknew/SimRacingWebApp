import { getParticipants } from "./actions";

type StandingsPageProps = {
  params: {
    id: string;
  };
};

const StandingsPage: React.FC<StandingsPageProps> = async ({
  params: { id },
}) => {
  const participants = await getParticipants(id);
  return (
    <div>
      {participants.map((u) => (
        <p key={u.user.id}>
          {u.user.name}
          {u.points}
        </p>
      ))}
    </div>
  );
};

export default StandingsPage;
