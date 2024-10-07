import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import RaceForm from "@/src/components/organisms/RaceForm/RaceForm";
import { createRace } from "./actions";
import Navbar from "@/src/components/organisms/Navbar/Navbar";

export const metadata = {
  title: "Create Race - SimRacingWebApp",
};

const CreateEventPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/races/create-race");
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <Navbar />
      <div className="flex justify-center pt-20">
        <RaceForm createRace={createRace} />
      </div>
    </div>
  );
};

export default CreateEventPage;
