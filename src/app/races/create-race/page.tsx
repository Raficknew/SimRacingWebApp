import { getServerSession } from "next-auth";
import Navbar from "../../../components/organizms/Navbar/Navbar";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import RaceForm from "@/src/components/organizms/RaceForm/RaceForm";
import { createRace } from "./actions";

export const metadata = {
  title: "Create Race - SimRacingWebApp",
};

const CreateEventPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/create-event");
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
