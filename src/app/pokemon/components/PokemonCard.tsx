import Image from 'next/image';
import { Pokemon } from 'types/pokemon';

import Pill from './Pill';

type PokemonCardProps = {
  pokemon: Pokemon;
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="flex flex-1 flex-col bg-slate-100 rounded-lg shadow-lg mt-3 relative">
      <h3 className="text-sm font-medium text-white px-2 py-1 rounded-full border border-slate-300 bg-slate-600 shadow-md mb-4 absolute -top-3 left-10 right-10 mx-auto">
        {pokemon.name}
      </h3>
      <div className="bg-white border-y border-slate-300 rounded-lg py-5">
        <Image
          alt={`Picture of ${pokemon.name}`}
          className="mx-auto h-32 w-32 flex-shrink-0"
          height={128}
          src={pokemon.sprites.front_default}
          width={128}
        />
      </div>

      <dl className="pb-1 text-sm grid grid-cols-3">
        <dt className="px-4 py-2 col-span-1 text-left text-gray-500 ">
          Weight
        </dt>
        <dd className="px-4 py-2 col-span-2 text-right">{pokemon.weight}</dd>
        <dt className="px-4 py-2 col-span-1 text-left text-gray-500 border-t border-slate-200">
          Moves
        </dt>
        <dd className="px-4 py-2 col-span-2 text-right  border-t border-slate-200">
          {pokemon.moves.length}
        </dd>
        <dt className="px-4 py-2 col-span-1 text-left text-gray-500 border-t border-slate-200">
          Types
        </dt>
        <dd className="px-4 py-2 col-span-2 text-right border-t border-slate-200">
          <div className="flex gap-1 flex-wrap place-content-end">
            {pokemon.types.map((type) => (
              <Pill key={type.type.name} name={type.type.name} />
            ))}
          </div>
        </dd>
        <dt className="px-4 py-2 col-span-1 text-left text-gray-500 border-t border-slate-200">
          Abilities
        </dt>

        <dd className="px-4 py-2 col-span-2 text-right border-t border-slate-200">
          <div className="flex gap-1 flex-wrap place-content-end">
            {pokemon.abilities.map((ability) => (
              <Pill
                color={ability.is_hidden ? 'orange' : 'yellow'}
                key={ability.ability.name}
                name={ability.ability.name}
              />
            ))}
          </div>
        </dd>
      </dl>
    </div>
  );
}
