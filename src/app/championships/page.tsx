import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";
import Link from "next/link";
import SearchBar from "@/src/components/organisms/SearchBar/SearchBar";
import LeagueCard from "@/src/components/molecules/LeagueCard/LeagueCard";
import { Flag } from "lucide-react";

const ChampionshipsPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const session = await getServerSession(authOptions);
  const query = searchParams?.query || "";
  const leagues = await prisma.league.findMany({
    orderBy: { id: "desc" },
    include: { author: { select: { name: true, image: true } }, races: true },
    where: { name: { contains: query, mode: "insensitive" } },
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <SearchBar placeholder="Search for leagues" />
        {session && (
          <LinkButton href={"/championships/create"}>
            {" "}
            <Flag className="w-4 h-4" />
            Create League
          </LinkButton>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {leagues.map((league) => (
          <Link key={league.id} href={`/championships/${league.id}`}>
            <LeagueCard league={league} author={league.author} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChampionshipsPage;
