import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemon = async () => {
  const pokemonPromises = await axiosClient
    // get the list of pokemons
    .get(`/pokemon`)
    .then((res) => res.data)
    // fetch get the data of each pokemon as a proimise
    .then((res) =>
      res.results.map(({ url }: { url: string }) => axiosClient.get(url))
    )
    .catch(function (error: unknown) {
      throw new Error(`Error fetching pokemon: ${error}`);
    });

  return Promise.all(pokemonPromises)
    .then((responses) =>
      Promise.all(responses.map((response) => response.data))
    )
    .catch(function (error: unknown) {
      throw new Error(`Error fetching pokemon: ${error}`);
    });
};
