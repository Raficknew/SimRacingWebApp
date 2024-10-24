import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import Navbarlink from "@/src/components/atoms/NavbarLink/NavbarLink";
import DropDown from "@/src/components/molecules/DropDown/DropDown";
import { Home, Trophy, User, Search } from "lucide-react";

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="pt-3 px-10">
      <div className="bg-[#3F3F3F] flex self-stretch w-full items-center justify-between p-2 rounded-r-full">
        <p>Logo</p>
        <div className="flex gap-10">
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
