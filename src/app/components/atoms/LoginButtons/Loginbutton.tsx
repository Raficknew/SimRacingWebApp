"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

interface LoginbuttonProps {
  session: Session | null;
}

const LoginButton: React.FC<LoginbuttonProps> = ({ session }) => {
  const user = session?.user;
  return (
    <div>
      {user ? (
        <button
          className="flex items-center"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          LogOut
        </button>
      ) : (
        <button className="flex items-center" onClick={() => signIn()}>
          <LogIn className="mr-2 h-4 w-4" />
          LogIn
        </button>
      )}
    </div>
  );
};

export default LoginButton;
