# Freetrade Pokemon assignment

## Getting started

Check out the repo

### Install dependancies

```sh
npm install

# or yarn/pnpm install
```

### Basic Commands

```sh
# run in developer mode - localhost:3000
npm run dev

# run the production build
npm run build

# Serve the production build - localhost:3000
npm start


```

### Node version

Ensure your system is running node >= `18.17`

If you have nvm run something like `nvm use 18.17` or higher.

## Solution: Technical and Design Choices

### The App

```sh
npm run dev
# or
npm run build-start
```

- Styling is achieved with Tailwind for rapid developement. Uusally I would prefer regular css.
- When starting the dev or prod build `http://localhost:3000` will be directed to `http://localhost:3000/pokemon`
- The infinite Scroll is handled using TanStack Query. I didnt have time to implemnet a virtualised list but this would be the prefered approach for better performance. The `useInfiniteQuery` hook returns the results as page chunks containing a property of `nextPage` which can be fetched when you get to the bottom of the list. I used `react-intersection-observer` for this.
- The `PokemonList` renders a list of Pokemon cards from the search results.
- The page is fully mobile-first/responsive.
- You are able to search by `Name`, `Type` and `Ability` via the dropdown in the search panel.
  - Currently it searches and filters only the available pokemon - ie only the ones that have already been fetched rathe rthat querying the API by Name etc. This is beacuse Poke API does not allow for fuzzy searching - to get a vaild response you would need to type the name exactly which means rapid user feedback on search reults is hard. I decided to go with the option provided for the sake of time.

## What I would have done with more time

- Virtualised list.
- A better solution for querying the API by name / attribute.
- Tests
