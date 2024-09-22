import { League, Race } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LeagueCardProps {
  league: League;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{league.name}</CardTitle>
        <CardDescription>{league.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>es</p>
      </CardContent>
      <CardFooter>
        <p>Autor: Raficknew</p>
      </CardFooter>
    </Card>
  );
};

export default LeagueCard;
