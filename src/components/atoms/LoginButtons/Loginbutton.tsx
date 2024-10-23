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
          className="flex justify-center text-[#F6F6F6] items-center hover:text-red-400"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4 " />
          <p className="text-white">LogOut</p>
        </button>
      ) : (
        <button
          className="flex justify-center text-[#F6F6F6] items-center hover:text-red-400"
          onClick={() => signIn()}
        >
          <LogIn className="mr-2 h-4 w-4 " />
          <p className="text-white">LogIn</p>
        </button>
      )}
    </div>
  );
};

export default LoginButton;
