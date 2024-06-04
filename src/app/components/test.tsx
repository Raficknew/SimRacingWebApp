"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface TestingProps {
  session: Session | null;
}

const Testing: React.FC<TestingProps> = ({ session }) => {
  const user = session?.user;
  return (
    <div>
      {user ? (
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
};

export default Testing;
