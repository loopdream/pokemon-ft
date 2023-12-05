import { Pokemon } from 'types/pokemon';

import PokemonCard from './PokemonCard';

type PokemonListProps = {
  pokemonList: Pokemon[];
};

export default function PokemonList({ pokemonList }: PokemonListProps) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {pokemonList &&
        pokemonList?.map((pokemon) => (
          <li
            key={pokemon.name}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
    </ul>
  );
}
