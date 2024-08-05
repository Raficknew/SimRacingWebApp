import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock2, Map, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type RaceCardProps = {
  id: string;
  name: string;
  circuit: string;
  series: string;
  author: string;
  authorPicture: string;
  hour: string;
  date: string;
  href: string;
};

const RaceCard: React.FC<RaceCardProps> = ({
  author,
  authorPicture,
  circuit,
  series,
  name,
  hour,
  date,
  id,
  href,
}) => {
  return (
    <Link
      href={href + id}
      className="self-stretch bg-slate-400 p-1 rounded-lg text-white max-w-[814px] min-w-[200px]"
    >
      <div className="flex self-stretch justify-between items-center">
        {series === "GT3 HYPERCAR" ? (
          <div className="flex items-center gap-1">
            <Badge>GT3</Badge>
            <Badge>HYPERCAR</Badge>
          </div>
        ) : (
          <Badge>{series}</Badge>
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
        <p className="text-2xl">{name}</p>
      </div>
      <div className="flex gap-2 self-stretch flex-wrap">
        <div className="flex gap-1 items-center">
          <Map className="h-4 w-4" />
          <p>{circuit}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Clock2 className="h-4 w-4" />
          <p>{hour}</p>
          <p>{date.split("-").reverse().join("-")}</p>
        </div>
      </div>
    </Link>
  );
};

export default RaceCard;
