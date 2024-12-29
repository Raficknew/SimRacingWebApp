import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ParticipantWithPositionProps {
  name: string;
  avatar?: string;
  position: number;
}

const ParticipantWithPosition: React.FC<ParticipantWithPositionProps> = ({
  name,
  avatar,
  position,
}) => {
  return (
    <div
      className={
        "flex h-[36px] items-center px-3 py-1 rounded-sm min-w-[200px] bg-[#3A3A3A] bg-opacity-95 text-white " +
          {
            1: "border-[0.5px] border-yellow-200 shadow shadow-yellow-200",
            2: "border-[0.5px] border-gray-300 shadow shadow-gray-300",
            3: "border-[0.5px] border-amber-700 shadow shadow-amber-700",
          }[position] || "text-gray-500"
      }
    >
      <p
        className={
          "pr-4 w-6 " +
            {
              1: "text-yellow-200",
              2: "text-gray-300",
              3: "text-amber-700",
            }[position] || "text-gray-500"
        }
      >
        {position}
      </p>
      <div className="flex items-center gap-2">
        <Avatar className="size-7">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-custom-gradient">
            <User className="size-5" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm">{name}</p>
      </div>
    </div>
  );
};

export default ParticipantWithPosition;
