import { Pokemon } from 'types/pokemon';

import PokemonCard from './PokemonCard';

type PokemonListProps = {
  data: Pokemon[];
};

export default function PokemonList({ data }: PokemonListProps) {
  return (
    <ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      role="list"
    >
      {data?.map((pokemon) => (
        <li
          className="col-span-1 flex flex-col text-center"
          key={pokemon.name}
          role="listitem"
        >
          <PokemonCard pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
}
