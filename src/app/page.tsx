import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Testing from "./components/test";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session && "Welcome " + session?.user?.name}
      <Testing session={session} />
    </div>
  );
}
