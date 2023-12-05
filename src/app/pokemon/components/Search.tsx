import { SearchByEnum } from '../page';
import Dropdown from './dropdown';

type SearchProps = {
  handleUpdateSearch: (search: string) => void;
  searchBy: SearchByEnum;
  setSearchBy: (searchCriteria: SearchByEnum) => void;
  searchByOptions: (string | SearchByEnum)[];
};

export default function Search({
  handleUpdateSearch,
  searchBy,
  setSearchBy,
  searchByOptions,
}: SearchProps) {
  return (
    <form>
      <div>
        <label htmlFor="email" className="sr-only">
          Search
        </label>
        <input
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
          onChange={(e) => {
            e.preventDefault();
            handleUpdateSearch(e.target.value);
          }}
        />
        <Dropdown
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          searchByOptions={searchByOptions}
        />
      </div>
    </form>
  );
}
