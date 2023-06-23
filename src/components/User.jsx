import { useInfiniteQuery, useQueryClient } from "react-query";
import axios from "axios";
import TableComponent from "./Table";
import { useEffect, useState } from "react";

const fetchUsers = ({ pageParam = 0 }) => {
  return axios.get(
    `https://dummyjson.com/products?limit=20&skip=${20 * pageParam}`
  );
};

const fetchSearchResults = async (search) => {
  const response = await axios.get(
    `https://dummyjson.com/products/search?q=${search}`
  );
  return response.data;
};

export const User = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const { isLoading, isError, error, data, fetchNextPage, isFetching } =
    useInfiniteQuery(["users"], fetchUsers, {
      getNextPageParam: (_lastPage, pages) => {
        if (
          pages[pages.length - 1].data.skip < pages[pages.length - 1].data.total
        ) {
          return pages.length;
        } else {
          return undefined;
        }
      },
    });

  const handleSearch = async () => {
    const searchResults = await fetchSearchResults(search);
    queryClient.setQueryData(["users"], {
      pages: [{ data: searchResults }],
    });
    setHasSearched(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      // Check if a search has been performed before allowing fetchNextPage
      if (!hasSearched) {
        return;
      }

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        fetchNextPage();
      }
    });
  }, [fetchNextPage, hasSearched]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        <input type="text" value={search} onChange={handleSearchChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <TableComponent
          data={data.pages.flatMap((item) =>
            item.data.products.map((product) => ({
              id: product.id,
              title: product.title,
              price: product.price,
            }))
          )}
        />
      </div>
      {isFetching ? <div>Loading...</div> : <></>}
    </>
  );
};
