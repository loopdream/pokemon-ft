'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ScrollToTop from 'react-scroll-to-top';

import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { Pokemon as PokemonType } from 'types/pokemon';
import { SearchByEnum } from 'types/search';

import { getPokemon } from 'utils/requests';

import Logo from './components/Logo';
import PokemonList from './components/PokemonList';
import SearchPanel from './components/SearchPanel';
import SkeletonList from './components/SkeletonList';

export default function Pokemon() {
  const { ref, inView } = useInView();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<SearchByEnum>(SearchByEnum.Name);

  const { data, error, isFetching, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['pokemon'],
      queryFn: getPokemon,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

  useEffect(() => {
    // load more pokemon when the user scrolls to the bottom of the page
    if (inView && !isFetchingNextPage && searchTerm === '') {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage, searchTerm, inView]);

  const handleUpdateSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const debouncedUpdateSearch = debounce(handleUpdateSearch, 200);

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

  return (
    <main className="min-h-screen p-8 lx:p-0 max-w-7xl mx-auto">
      <header className="flex flex-col mb-10 justify-center md:flex-row md:justify-between md:h-[120px]">
        <div>
          <Logo />
        </div>
        <SearchPanel
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          searchByOptions={Object.values(SearchByEnum)}
          handleUpdateSearch={debouncedUpdateSearch}
        />
      </header>

      {error && (
        <p className="text-center font-medium mt-6">
          There was an error fetching the data
        </p>
      )}

      {searchTerm !== '' && filteredPokemon.length === 0 && (
        <p className="text-center font-medium mt-6">
          No Pokemon found with the search term `{searchTerm}`
        </p>
      )}

      {(isFetching || (filteredPokemon.length === 0 && searchTerm === '')) && (
        <SkeletonList />
      )}

      <PokemonList data={filteredPokemon} />

      <div ref={ref} />

      <ScrollToTop
        smooth
        className="flex justify-center items-center"
        component={<ArrowUpIcon className="fill-slate-600 w-6 h-6" />}
      />
    </main>
  );
}
