import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ParticipantWithPointsAndPositionProps {
  name: string;
  avatar?: string;
  position: number;
  points: number;
}

const ParticipantWithPointsAndPosition: React.FC<
  ParticipantWithPointsAndPositionProps
> = ({ name, avatar, position, points }) => {
  return (
    <div
      className={
        "flex items-center px-3 py-1 rounded-sm w-full bg-[#3A3A3A] bg-opacity-95 text-white " +
          {
            1: "border-[0.5px] border-yellow-200 shadow shadow-yellow-200",
            2: "border-[0.5px] border-gray-300 shadow shadow-gray-300",
            3: "border-[0.5px] border-amber-700 shadow shadow-amber-700",
          }[position] || "text-gray-500"
      }
    >
      <p
        className={
          "pr-6 w-6 " +
            {
              1: "text-yellow-200",
              2: "text-gray-300",
              3: "text-amber-700",
            }[position] || "text-gray-500"
        }
      >
        {position}
      </p>
      <div className="flex items-center gap-2 pr-4">
        <Avatar className="size-7">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-custom-gradient">
            <User className="size-5" />
          </AvatarFallback>
        </Avatar>
        <p className="text-sm">{name}</p>
      </div>
      <p className="ml-auto w-4">{points}</p>
    </div>
  );
};

export default ParticipantWithPointsAndPosition;
