import { getServerSession } from "next-auth";
import DropDown from "../../molecules/DropDown/DropDown";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import Navbarlink from "../../atoms/NavbarLink/NavbarLink";
import { Home, Gamepad2, Trophy, User } from "lucide-react";

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="pt-3 px-10 bg-[#303030]">
      <div className="bg-[#3F3F3F] flex self-stretch w-full items-center justify-between p-2 rounded-r-full">
        <p>Logo</p>
        <div className="flex gap-10">
          <Navbarlink link="/" icon={<Home />} title="Home" />
          <Navbarlink link="/races/search" icon={<Gamepad2 />} title="Races" />
          <Navbarlink
            link="/championships"
            icon={<Trophy />}
            title="Championships"
          />
          <Navbarlink link="/profile" icon={<User />} title="Profile" />
        </div>
        <DropDown session={session} />
      </div>
    </div>
  );
};

export default Navbar;
