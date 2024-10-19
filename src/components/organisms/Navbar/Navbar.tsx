import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import Navbarlink from "@/src/components/atoms/NavbarLink/NavbarLink";
import DropDown from "@/src/components/molecules/DropDown/DropDown";
import { Home, Trophy, User, Search } from "lucide-react";

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="pt-3 px-10 w-full">
      <div className="bg-[#F2F2F2] bg-opacity-5 flex self-stretch w-full items-center justify-between px-10 py-1 rounded-xl ">
        <div className="flex gap-5">
          <Navbarlink link="/" icon={<Home />} title="Home" />
          <Navbarlink link="/races/search" icon={<Search />} title="Races" />
          <Navbarlink
            link="/championships"
            icon={<Trophy />}
            title="Championships"
          />
          <Navbarlink
            link={`/profile/${session?.user?.name}`}
            icon={<User />}
            title="Profile"
          />
        </div>
        <DropDown session={session} />
      </div>
    </div>
  );
};

export default Navbar;
