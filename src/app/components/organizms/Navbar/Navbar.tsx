import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const user = session?.user;
  return (
    <div className="p-5">
      <div className="bg-[#3F3F3F] flex self-stretch w-full">
        <p>es</p>
      </div>
    </div>
  );
};

export default Navbar;
