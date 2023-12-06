import { SearchByEnum } from '../page';
import Dropdown from './Dropdown';

type SearchProps = {
  count: number;
  handleUpdateSearch: (search: string) => void;
  searchBy: SearchByEnum;
  setSearchBy?: (searchCriteria: SearchByEnum) => void;
  searchByOptions: (string | SearchByEnum)[];
};

export default function SearchPanel({
  count = 0,
  handleUpdateSearch,
  searchBy,
  setSearchBy,
  searchByOptions,
}: SearchProps) {
  // Form + submit btn is for semantics - we wont be using it for this app.
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="bg-white shadow rounded-lg md:w-3/5"
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900 mb-3">
          Search {count} Pokemon by {searchBy}
        </h3>
        <div className="flex w-full">
          <input
            autoComplete="off"
            className="block w-full rounded-md mr-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="search"
            name="search"
            onChange={(e) => handleUpdateSearch(e.target.value)}
            placeholder="Search"
            type="search"
          />
          <Dropdown
            searchBy={searchBy}
            searchByOptions={searchByOptions}
            setSearchBy={setSearchBy}
          />
          <button type="submit" className="sr-only">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
