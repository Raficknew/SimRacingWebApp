import { buttonVariants } from "@/components/ui/button";
import { Flag } from "lucide-react";
import Link from "next/link";

interface CreateRaceButton {}

const CreateRaceButton: React.FC<CreateRaceButton> = () => {
  return (
    <Link
      className={buttonVariants({
        variant: "outline",
        className: "self-end flex",
      })}
      href={"/races/create-race"}
    >
      <Flag className="w-4 h-4" />
      <p className="pl-2">Create Race</p>
    </Link>
  );
};

export default CreateRaceButton;
