"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

type LoginbuttonProps = {
  session: Session | null;
};

const LoginButton: React.FC<LoginbuttonProps> = ({ session }) => {
  const user = session?.user;
  return (
    <div>
      {user ? (
        <button
          className="flex justify-center  items-center"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4 " />
          <p>Wyloguj się</p>
        </button>
      ) : (
        <button
          className="flex justify-center items-center"
          onClick={() => signIn()}
        >
          <LogIn className="mr-2 h-4 w-4 " />
          <p>Zaloguj się</p>
        </button>
      )}
    </div>
  );
};

export default LoginButton;
