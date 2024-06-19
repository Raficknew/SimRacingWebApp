import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginButton from "./components/atoms/LoginButtons/Loginbutton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex justify-center items-center flex-col">
      {session && "Welcome " + session?.user?.name}
      <LoginButton session={session} />
    </div>
  );
}
