import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

const RQHeroes2 = () => {
  const onSuccess = (data) => {
    console.log("fetching data successfully", data);
  };
  const onError = (err) => {
    console.log("error fetching data", err);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onError, onSuccess);
  console.log(isLoading, isFetching);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
      <h1>RQHeroes</h1>
      {data?.map((hero, index) => {
        return <div key={index}>{hero}</div>;
      })}
      <button onClick={() => refetch()}>Fetch data</button>
    </>
  );
};

export default RQHeroes2;
