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

- I went with Next JS as it's quick to get up and running.
- The app uses Next's app route architechture and is built with both server and client react components.
- Styling is achieved with Tailwind for rapid developement. Uusally I would prefer regualr css.
- When starting the dev or prod build `http://localhost:3000` will be directed to `http://localhost:3000/pokemon`
- The infiniteScroll is handled using TanStack Query. I didnt have time to virtualise the list but this would be the prefered appraoch for better performance.
- The `PokemonList` renders a list of pokemon cards from the search results.
- The page is fully mobile-first/responsive.
- You are able to search by `Name`, `Type` and `Ability` via the dropdown in the search panel.
  - Currently it searches and filters only the available pokemon - ie only the ones that have already been fetched rathe rthat querying the API by Name etc. This is beacuse Poke API does not allow for fuzzy searching - to get a vaild response you would need to type the name exactly which means rapid user feedback on search reults is hard. I decided to go with the option provided for the sake of time.

## What I would have done with more time

- Virtualised list.
- A better solution for querying the API by name / attribute.
- Tests
