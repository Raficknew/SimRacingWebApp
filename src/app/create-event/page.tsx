import { getServerSession } from "next-auth";
import Navbar from "../components/organizms/Navbar/Navbar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface CreateEventPageProps {}

const CreateEventPage: React.FC<CreateEventPageProps> = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/create-event");
  }
  return (
    <>
      <Navbar />
      <p>Pizza na tłustym cieście</p>
    </>
  );
};

export default CreateEventPage;
