import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

type PokemonListProps = {
  pokemons: Pokemon[];
};

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {pokemons &&
        pokemons?.map((pokemon) => (
          <li
            key={pokemon.name}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col">
              <Image
                src={pokemon.sprites.front_default}
                alt={`Picture of ${pokemon.name}`}
                width={128}
                height={128}
                className="mx-auto h-32 w-32 flex-shrink-0"
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {pokemon.name}
              </h3>
              <dl className="my-3 divide-y divide-gray-100 text-sm leading-6">
                <div className="flex justify-between gap-x-4 p-3">
                  <dt className="text-gray-500">Type</dt>
                  <dd className="flex items-start gap-x-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 p-3 pb-0">
                  <dt className="text-gray-500">Abilities</dt>
                  <dd className="text-gray-700">
                    {pokemon.abilities.map((ability) => (
                      <span
                        key={ability.ability.name}
                        className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-1"
                      >
                        {ability.ability.name}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
    </ul>
  );
}
