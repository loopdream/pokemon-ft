import Image from 'next/image';
import { Pokemon } from 'types/pokemon';

type PokemonCardProps = {
  pokemon: Pokemon;
};

function Pill({ name }: { name: string; color?: string }) {
  const className = `inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800`;
  return (
    <span key={name} className={className}>
      {name}
    </span>
  );
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="flex flex-1 flex-col">
      <Image
        src={pokemon.sprites.front_default}
        alt={`Picture of ${pokemon.name}`}
        width={128}
        height={128}
        className="mx-auto h-32 w-32 flex-shrink-0"
      />
      <h3 className="mt-6 text-sm font-medium text-gray-900">{pokemon.name}</h3>
      <dl className="pb-1 divide-y divide-gray-100 text-sm grid grid-cols-3">
        <dt className="px-4 py-2 col-span-1 text-left text-gray-500">Weight</dt>
        <dd className="px-4 py-2 col-span-2 text-right">{pokemon.weight}</dd>
        <dt className="px-4 py-2 col-span-1 text-left text-gray-500">Moves</dt>
        <dd className="px-4 py-2 col-span-2 text-right">
          {pokemon.moves.length}
        </dd>
        <dt className="px-4 py-2 col-span-1 text-left text-gray-500">Types</dt>
        <dd className="px-4 py-2 col-span-2 text-right">
          <div className="flex gap-1 flex-wrap place-content-end">
            {pokemon.types.map((type) => (
              <Pill key={type.type.name} name={type.type.name} />
            ))}
          </div>
        </dd>
        <dt className="px-4 py-2 col-span-1 text-left text-gray-500">
          Abilities
        </dt>

        <dd className="px-4 py-2 col-span-2 text-right">
          <div className="flex gap-1 flex-wrap place-content-end">
            {pokemon.abilities.map((ability) => (
              <Pill key={ability.ability.name} name={ability.ability.name} />
            ))}
          </div>
        </dd>
      </dl>
    </div>
  );
}
