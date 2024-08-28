import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div>Invites:</div>
      <p>Hej zapraszam cię</p>
    </>
  );
};

export default ProfilePage;
