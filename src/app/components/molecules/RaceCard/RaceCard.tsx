import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock2, Map, User } from "lucide-react";

interface RaceCardProps {
  name: string;
  circuit: string;
  author: string;
  authorPicture: string;
  startTime: string;
}

const RaceCard: React.FC<RaceCardProps> = ({
  author,
  authorPicture,
  circuit,
  name,
  startTime,
}) => {
  return (
    <div className="self-stretch bg-slate-400 p-3 rounded-lg text-white max-w-[814px] min-w-[200px]">
      <div className="flex justify-end items-center gap-2">
        <p>{author}</p>
        <Avatar>
          <AvatarImage src={authorPicture} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="mb-4 self-stretch">
        <p>{name}</p>
      </div>
      <div className="flex gap-2 self-stretch flex-wrap">
        <div className="flex gap-1 items-center">
          <Map className="h-4 w-4" />
          <p>{circuit}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Clock2 className="h-4 w-4" />
          <p>{startTime}</p>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
