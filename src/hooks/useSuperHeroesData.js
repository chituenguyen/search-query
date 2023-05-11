import axios from "axios";
import { useQuery } from "react-query";
const fetchData = () => {
  return axios.get("http://localhost:4000/superheroes");
};
// custom hooks
export const useSuperHeroesData = (onError, onSuccess) => {
  return useQuery("super-heroes", fetchData, {
    // cacheTime: 5000, // default 5 minutes (luu tru trong cache)
    // staleTime: 30000, // default 0ms  (set thoi gian fetching again)
    // refetchOnMount: true, // default true
    // refetchOnWindowFocus: false, // default false // whenever the browser window regains focus after being in the background.
    // refetchInterval: 1000, // default 0ms // fetching after time, using app
    // refetchIntervalInBackground: true, // default false // fetching after time of refectchInternal, dont using app
    enabled: false, // default true
    onError,
    onSuccess,
    select: (data) => {
      const rs = data.data.map((hero) => {
        return hero.name;
      });
      return rs;
    },
  });
};
