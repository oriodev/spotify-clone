import getSongsByTitle from '@/actions/getSongsByTitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';

interface SearchProps {
  searchParams: {
    title: string;
  };
}

// you can lit just draw out the searchParams with this prop - super cool !!
const Search = async ({ searchParams }: SearchProps) => {
  // this finds songs by the title from searchParams
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div
      className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
  "
    >
      <Header className="from-by-neutral-900">
        <div className="md-2 flex flex-col  gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
