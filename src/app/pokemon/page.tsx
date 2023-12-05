'use client';

import { useEffect, useState } from 'react';

// import toast, { Toaster } from 'react-hot-toast';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Pokemon as PokemonType } from 'types/pokemon';

import { getPokemon } from 'utils/requests';

import PokemonList from './components/PokemonList';
import Search from './components/Search';

export enum SearchByEnum {
  Name = 'Name',
  Abilities = 'Abilities',
  Type = 'Type',
}

const searchByOptions = Object.values(SearchByEnum);

export default function Pokemon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<SearchByEnum>(SearchByEnum.Name);
  const [pokemon, setPokemon] = useState<PokemonType[] | []>([]);

  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    // isFetchingNextPage,
    // isFetchingPreviousPage,
    // fetchPreviousPage,
    // hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon', searchBy, searchTerm],
    queryFn: getPokemon,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  useEffect(() => {
    const pokemon = data?.pages.flatMap((page) => page.pokemon);
    if (pokemon && pokemon.length > 0) {
      setPokemon(pokemon);
    }
  }, [data]);

  const handleUpdateSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const showPokemon = !isFetching && !error && pokemon && pokemon.length > 0;

  console.log({ SearchByEnum, searchBy, searchByOptions });

  return (
    <main className="min-h-screen p-24">
      <Search
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        searchByOptions={searchByOptions}
        handleUpdateSearch={handleUpdateSearch}
      />
      {error && <p>There was an error fetching the data</p>}
      {showPokemon && <PokemonList pokemonList={pokemon} />}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}
    </main>
  );
}
