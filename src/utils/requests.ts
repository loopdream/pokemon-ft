import axios from 'axios';
import { Pokemon } from 'types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export type PokemonResponseType = {
  count: number;
  next: string;
  previous: string;
  pokemon: Array<Pokemon[]>;
};

type getPokemonProps = {
  queryKey: string[];
  pageParam: number | string;
  meta: Record<string, unknown> | undefined;
};

export const getPokemon = async ({ pageParam }: getPokemonProps) => {
  const url = typeof pageParam === 'string' ? pageParam : API_URL;

  // fetch the list of pokemon
  const pokemonList = await axios
    .get(url)
    .then((res) => res.data)
    .catch(function (error: unknown) {
      throw new Error(`Error fetching pokemonList: ${error}`);
    });

  const pokemonPromises = pokemonList.results.map(({ url }: { url: string }) =>
    axios.get(url)
  );

  return Promise.all(pokemonPromises)
    .then((responses) =>
      Promise.all(responses.map((response) => response.data))
    )
    .then((pokemon) => {
      const { count, next, previous } = pokemonList;
      const pageCount = Math.ceil(count / 20);
      return {
        count,
        nextPage: next,
        pageCount,
        pokemon,
        previous,
      };
    })
    .catch(function (error: unknown) {
      throw new Error(`Error fetching pokemon: ${error}`);
    });
};
