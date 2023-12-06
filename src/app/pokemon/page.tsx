'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ScrollToTop from 'react-scroll-to-top';

import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
// import 'server-only';
import { Pokemon as PokemonType } from 'types/pokemon';

import { getPokemon } from 'utils/requests';

import Logo from './components/Logo';
import PokemonList from './components/PokemonList';
import SearchPanel from './components/SearchPanel';

export enum SearchByEnum {
  Name = 'Name',
  Abilities = 'Abilities',
  Types = 'Types',
}

export const fetchCache = 'orce-no-store';

const searchByOptions = Object.values(SearchByEnum);

export default function Pokemon() {
  const { ref, inView } = useInView();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<SearchByEnum>(SearchByEnum.Name);

  const { data, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['pokemon', searchTerm],
    queryFn: getPokemon,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  useEffect(() => {
    // load more pokemon when the user scrolls to the bottom of the page
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleUpdateSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const count = data?.pages[0].count || 0;

  const pokemonData: PokemonType[] =
    data?.pages.flatMap((page) => page.pokemon) ?? [];

  const filteredPokemon =
    pokemonData.filter((pokemon) => {
      if (searchBy === SearchByEnum.Name) {
        return pokemon.name.includes(searchTerm);
      }

      if (searchBy === SearchByEnum.Abilities) {
        return (
          pokemon.abilities
            .map((ability) => ability.ability.name)
            .filter((ability) => ability.includes(searchTerm)).length > 0
        );
      }

      if (searchBy === SearchByEnum.Types) {
        return (
          pokemon.types
            .map((type) => type.type.name)
            .filter((type) => type.includes(searchTerm)).length > 0
        );
      }
    }) || pokemonData;

  console.log({ data });
  return (
    <main className="min-h-screen p-8 lx:p-0 max-w-7xl mx-auto">
      <header className="flex flex-col mb-10 justify-center md:flex-row md:justify-between">
        <div>
          <Logo />
        </div>
        <SearchPanel
          count={count}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          searchByOptions={searchByOptions}
          handleUpdateSearch={handleUpdateSearch}
        />
      </header>

      {error && (
        <p className="text-center font-medium mt-6">
          There was an error fetching the data
        </p>
      )}

      <PokemonList data={filteredPokemon} />

      <div ref={ref}>
        {isFetchingNextPage && <p className="text-center mt-6">Loading..</p>}
      </div>

      <ScrollToTop
        smooth
        className="flex justify-center items-center"
        component={<ArrowUpIcon className="fill-slate-600 w-6 h-6" />}
      />
    </main>
  );
}
