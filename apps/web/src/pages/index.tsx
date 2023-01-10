import Leaderboard from "@components/Leaderboard";
import Overview from "@components/Overview";

const Home = () => {
  return (
    <div className="mt-8">
      <Overview />
      <Leaderboard className="mt-4" />
    </div>
  );
};

export default Home;
