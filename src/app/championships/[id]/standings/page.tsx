import { notFound } from "next/navigation";
import { getParticipantPoints } from "./actions";
import ParticipantBox from "@/src/components/atoms/PatricipantBox/PatricipantBox";

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
      {participants.map((u, index) => (
        <ParticipantBox
          key={u.driver}
          team={"Payed Drivers"}
          position={index + 1}
          points={u.points}
        >
          {u.driver}
        </ParticipantBox>
      ))}
    </div>
  );
};

export default StandingsPage;
