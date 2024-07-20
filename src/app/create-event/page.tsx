import { getServerSession } from "next-auth";
import Navbar from "../components/organizms/Navbar/Navbar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Create Race - SimRacingWebApp",
};

async function addRace(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/create-event");
  }

  const useremail = session.user?.email;

  if (useremail) {
    const user = await prisma.user.findUnique({
      where: { email: useremail },
    });

    if (user) {
      const id = user?.id;

      const name = formData.get("name")?.toString();
      const circuit = formData.get("circuit")?.toString();
      const raceDate = formData.get("raceDate")?.toString();
      const description = formData.get("description")?.toString();
      const userId = id.toString();

      if (!name || !description || !circuit || !raceDate || !userId) {
        throw new Error("Missing required fields");
      }

      await prisma.race.create({
        data: { name, description, circuit, raceDate, userId },
      });

      redirect("/");

      // ! toast to add
    }
  }
}

const CreateEventPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/create-event");
  }

  return (
    <>
      <Navbar />
      <form action={addRace}>
        <Label htmlFor="name">Race Name</Label>
        <Input required name="name" placeholder="Race Name" type="text" />

        <Label htmlFor="circuit">Circuit</Label>
        <Input required name="circuit" placeholder="Circuit" type="text" />

        <Label htmlFor="raceDate">Race Date</Label>
        <Input required name="raceDate" placeholder="Race Date" type="date" />

        <Label htmlFor="description">Description</Label>
        <Textarea
          required
          name="description"
          placeholder="Description"
          id="description"
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default CreateEventPage;
