"use client";
import { Button } from "@/components/button";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Github } from "lucide-react";

interface GithubLogProps {
  session: Session | null;
}

const GithubLog: React.FC<GithubLogProps> = ({ session }) => {
  const user = session?.user;
  return (
    <div>
      {user ? (
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
      ) : (
        <Button
          className="bg-[#FF5656] hover:bg-[#F83B3B]"
          onClick={() => signIn()}
        >
          <Github className="mr-2 h-4 w-4" /> LogIn with Github
        </Button>
      )}
    </div>
  );
};

export default GithubLog;
