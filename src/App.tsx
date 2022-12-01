import { PokemonProvider, usePokemon } from "./Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  ReactLocation,
  Router,
  useMatch,
} from "@tanstack/react-location";
import PokemonDetail from "./PokemonDetail";

const queryClient = new QueryClient();
const location = new ReactLocation();
function SearchBox() {
  const { search, setSearch } = usePokemon();
  return (
    <input
      className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2"
      placeholder="Busca"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
const PokemonList = () => {
  const { pokemon } = usePokemon();
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-3">
      {pokemon.map((p) => (
        <Link key={p.id} to={`/pokemon/${p.id}`}>
          <li            
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200  cursor-pointer	"
          >
            <div className="flex-1 flex flex-col p-8">
              <img
                className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full "
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                alt=""
              />
              <h3 className="mt-6 text-gray-900 text-sm font-medium">
                {p.name}
              </h3>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

const routes = [
  {
    path: "/",
    element: (
      <>
        <SearchBox />
        <PokemonList />
      </>
    ),
  },
  {
    path: "/pokemon/:id",
    element: (
      <>
        <PokemonDetail />
      </>
    ),
  },
];
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <Router location={location} routes={routes}>
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </Router>
      </PokemonProvider>
    </QueryClientProvider>
  );
}

export default App;
