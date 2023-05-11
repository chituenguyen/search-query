import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import RQHeroes from "./components/RQHeroes";
import "./App.css";
import { SuperHeroesPage } from "./components/HerosPage";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import RQHeroes2 from "./components/RQHeroes2";
import HeroDetail from "./components/HeroDetail";
import ParallelQueriesPage from "./components/Parralel";
import DynamicParallelPage from "./components/DynamicParralel";
import DependentQueriesPage from "./components/DepentdentQueries";
import { PaginatedQueriesPage } from "./components/Pagination";
import { InfiniteQueriesPage } from "./components/Inifinete";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes2">RQ Super Heroes 2</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQHeroes />} />
            <Route path="/rq-super-heroes2" element={<RQHeroes2 />} />
            <Route path="/rq-super-heroes/:heroId" element={<HeroDetail />} />
            <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelPage heroIds={[1, 3]} />}
            />
            <Route
              path="/rq-dependent"
              element={<DependentQueriesPage email="vishwas@example.com" />}
            />
            <Route path="/rq-pagination" element={<PaginatedQueriesPage/>} />
            <Route path="/rq-infinite" element={<InfiniteQueriesPage/>} />

          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}

export default App;
