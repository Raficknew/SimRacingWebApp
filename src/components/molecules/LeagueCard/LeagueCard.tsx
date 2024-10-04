import { League } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

type Author = {
  name: string | null;
  image: string | null;
};

interface LeagueCardProps {
  league: League;
  author: Author;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, author }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{league.name}</CardTitle>
        <CardDescription>{league.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>ewc</p>
      </CardContent>
      <CardFooter>
        <p>Autor: </p>
        <Avatar>
          <AvatarImage src={author.image ?? ""} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <p>{author.name}</p>
      </CardFooter>
    </Card>
  );
};

export default LeagueCard;