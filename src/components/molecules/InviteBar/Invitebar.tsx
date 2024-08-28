"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

type InviteBarProps = {
  raceId: string;
  CreateInvite: (userEmail: string, raceID: string) => Promise<void>;
};

const InviteBar: React.FC<InviteBarProps> = ({ CreateInvite, raceId }) => {
  const handlesubmit = async (formData: FormData) => {
    const userEmail = formData.get("email")?.toString()!;

    if (!userEmail || !raceId) throw new Error("Missing Email");

    await CreateInvite(userEmail, raceId);

    redirect(`/races/${raceId}`);
  };

  return (
    <form action={handlesubmit} className="flex">
      <Input required type="email" placeholder="invite" name="email" />
      <Button>Send</Button>
    </form>
  );
};

export default InviteBar;
