import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock2, Map, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Series, type Race } from "@prisma/client";
import dayjs from "dayjs";

type Author = {
  name: string | null;
  image: string | null;
} | null;

type RaceCardProps = {
  race: Race;
  author: Author;
};

const RaceCard: React.FC<RaceCardProps> = ({ race, author }) => {
  return (
    <div className="bg-slate-400 p-1 rounded-lg text-white">
      <div className="flex self-stretch justify-between items-center">
        {race.series === Series.GT3HYPERCAR ? (
          <div className="flex items-center gap-1">
            <Badge>GT3</Badge>
            <Badge>HYPERCAR</Badge>
          </div>
        ) : (
          <Badge>{race.series}</Badge>
        )}
        <div className="flex justify-end items-center gap-2">
          {author && (
            <>
              <p className="text-sm">{author.name}</p>
              <Avatar className="h-9 w-9">
                <AvatarImage src={author.image ?? ""} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </>
          )}
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
