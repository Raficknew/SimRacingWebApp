import LinkButton from "@/src/components/atoms/LinkButton/LinkButton";

interface ChampionshipsPageProps {}

const ChampionshipsPage: React.FC<ChampionshipsPageProps> = () => {
  return <LinkButton href={"/championships/create"}>Create League</LinkButton>;
};

export default ChampionshipsPage;
