import { useQueries } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log({ queryResults });
  return <div>Dynamic Parallel Queries</div>;
};
export default DynamicParallelPage;

DynamicParallelPage.propTypes = {
  heroIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};
