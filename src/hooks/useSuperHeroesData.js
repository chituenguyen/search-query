import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
const fetchData = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};
// custom hooks
export const useSuperHeroesData = (onError, onSuccess) => {
  return useQuery("super-heroes", fetchData, {
    // cacheTime: 5000, // default 5 minutes (luu tru trong cache)
    // staleTime: 30000, // default 0ms  (set thoi gian fetching again)
    // refetchOnMount: true, // default true
    // refetchOnWindowFocus: false, // default true // whenever the browser window regains focus after being in the background.
    // refetchInterval: 1000, // default 0ms // fetching after time, using app
    // refetchIntervalInBackground: true, // default false // fetching after time of refectchInternal, dont using app
    enabled: true, // default true
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

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: data => {
    //   /** Query Invalidation Start */
    //   // queryClient.invalidateQueries('super-heroes')
    //   /** Query Invalidation End */

    //   /** Handling Mutation Response Start */
    // queryClient.setQueryData('super-heroes', oldQueryData => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data]
    //   }
    // })
    //   /** Handling Mutation Response Start */
    // },
    /**Optimistic Update Start */
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return { previousHeroData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
    /**Optimistic Update End */
  });
};
