import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useHeroDetail = (heroId) => {
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
};
