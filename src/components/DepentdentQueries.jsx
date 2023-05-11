import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data?.channelId;
  useQuery(["courses", channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });
  return <div>DependentQueries</div>;
};
export default DependentQueriesPage;
DependentQueriesPage.propTypes = {
  email: PropTypes.string.isRequired,
};
