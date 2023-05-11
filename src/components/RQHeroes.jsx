import { useState } from "react";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

const RQHeroes = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const onSuccess = (data) => {
    console.log("fetching data successfully", data);
  };
  const onError = (err) => {
    console.log("error fetching data", err);
  };

  const { isLoading, data, isError, error, refetch } =
    useSuperHeroesData(onError, onSuccess);
  const { mutate: addHero } = useAddSuperHeroData();
  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    console.log(hero);
    addHero(hero);
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      <h1>RQHeroes</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      {data?.map((hero, index) => {
        return (
          <div key={index + 1}>
            <Link to={`/rq-super-heroes/${index + 1}`}>{hero}</Link>
          </div>
        );
      })}
      <button onClick={() => refetch()}>Fetch data</button>
    </div>
  );
};

export default RQHeroes;
