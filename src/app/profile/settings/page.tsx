import { redirect } from "next/navigation";

interface ProfileSettingsPageProps {}

const ProfileSettingsPage: React.FC<ProfileSettingsPageProps> = () => {
  return redirect("/profile");
};

export default ProfileSettingsPage;
