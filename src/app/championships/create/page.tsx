import LeagueForm from "@/src/components/organisms/LeagueForm/LeagueForm";
import { createLeague } from "./actions";

const CreateLeaguePage = async () => {
  return <LeagueForm createLeague={createLeague} />;
};

export default CreateLeaguePage;
