import { useHeroDetail } from "../hooks/useHeroDetail";
import { useParams } from "react-router-dom";

const HeroDetail = () => {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useHeroDetail(heroId);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {data.data.name} - {data.data.alterEgo}
    </div>
  );
};

export default HeroDetail;
