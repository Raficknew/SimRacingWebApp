import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";
import Link from "next/link";
import SearchBar from "@/src/components/organisms/SearchBar/SearchBar";
import LeagueCard from "@/src/components/molecules/LeagueCard/LeagueCard";

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
    <div>
      {session && (
        <LinkButton href={"/championships/create"}>Create League</LinkButton>
      )}
      <SearchBar placeholder="Search for leagues" />
      {leagues.map((league) => (
        <Link key={league.id} href={`/championships/${league.id}`}>
          <LeagueCard league={league} author={league.author} />
        </Link>
      ))}
    </div>
  );
};

export default ChampionshipsPage;
