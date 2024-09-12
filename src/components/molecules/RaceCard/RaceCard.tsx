import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock2, Map, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Race } from "@prisma/client";

type RaceCardProps = {
  race: Race;
  author: string;
  authorPicture: string;
};

const RaceCard: React.FC<RaceCardProps> = ({ race, author, authorPicture }) => {
  const dayjs = require("dayjs");

  return (
    <div>
      <div className="flex self-stretch justify-between items-center">
        {race.series === "GT3 HYPERCAR" ? (
          <div className="flex items-center gap-1">
            <Badge>GT3</Badge>
            <Badge>HYPERCAR</Badge>
          </div>
        ) : (
          <Badge>{race.series}</Badge>
        )}
        <div className="flex justify-end items-center gap-2">
          <p className="text-sm">{author}</p>
          <Avatar className="h-9 w-9">
            <AvatarImage src={authorPicture} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="mb-4 self-stretch">
        <p className="text-2xl">{race.name}</p>
      </div>
      <div className="flex gap-2 self-stretch flex-wrap">
        <div className="flex gap-1 items-center">
          <Map className="h-4 w-4" />
          <p>{race.circuit}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Clock2 className="h-4 w-4" />
          <p>{race.raceHour}</p>
          <p>{dayjs(race.raceDate).format("DD MMM YYYY")}</p>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
