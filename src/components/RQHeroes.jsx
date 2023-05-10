import { useQuery } from "react-query";
import axios from "axios";
const RQHeroes = () => {
  const fetchData = () => {
    return axios.get("http://localhost:4000/superheroes");
  };
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchData,
    {
      cacheTime: 5000,
    }
  );
  console.log(isLoading, isFetching);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      <div>RQHeroes</div>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQHeroes;
