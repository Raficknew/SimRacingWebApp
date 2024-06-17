import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import GithubLog from "./components/atoms/LoginButtons/GithubLog";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      {session && "Welcome " + session?.user?.name}
      <GithubLog session={session} />
    </div>
  );
}
