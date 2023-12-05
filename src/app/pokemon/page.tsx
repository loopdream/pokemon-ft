'use client';

import { useQuery } from '@tanstack/react-query';

import { getPokemon } from '../../utils/requests';
import PokemonList from './components/PokemonList';
import Search from './components/Search';
import { Pokemon } from '../../types/pokemon';

export default function Pokemon() {

  const {
    data: pokemons,
    error,
    isLoading,
  } = useQuery<Pokemon[], Error>({
    queryKey: ['pokemons'],
    queryFn: getPokemon,
  });

  console.log({ pokemons, error, isLoading });
  if (error) return <p>{error.message}</p>;

  return (
    <main className="min-h-screen p-24">
      <Search />
      {error && <p>There was an error fetching the data</p>}
      {!isLoading && pokemons && <PokemonList pokemons={pokemons} /> }
    </main>
  );
}
