import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  return session
    ? redirect(`/profile/${session.user?.name}`)
    : redirect("/api/auth/signin?callbackUrl=/profile");
};

export default ProfilePage;
