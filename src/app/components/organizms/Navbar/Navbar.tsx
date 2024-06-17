import { getServerSession } from "next-auth";
import DropDown from "../../molecules/DropDown/DropDown";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

const Navbar: React.FC = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="pt-3 px-10 bg-[#303030]">
      <div className="bg-[#3F3F3F] flex self-stretch w-full items-center justify-between p-2 rounded-r-full">
        <p>es</p>
        <p>You turn me on</p>
        <DropDown session={session} />
      </div>
    </div>
  );
};

export default Navbar;
