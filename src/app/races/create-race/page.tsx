import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import RaceForm from "@/src/components/organisms/RaceForm/RaceForm";
import { createRace } from "./actions";

export const metadata = {
  title: "Create Race - SimRacingWebApp",
};

const CreateEventPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/races/create-race");
  }

  return (
    <div className="flex items-center justify-center">
      <RaceForm createRace={createRace} />
    </div>
  );
};

export default CreateEventPage;
