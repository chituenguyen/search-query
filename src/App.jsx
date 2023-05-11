import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import RQHeroes from "./components/RQHeroes";
import "./App.css";
import { SuperHeroesPage } from "./components/HerosPage";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import RQHeroes2 from "./components/RQHeroes2";
import HeroDetail from "./components/HeroDetail";
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
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
}

export default App;
