'use client';

import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import qs from 'query-string';
import Input from './Input';

const SearchInput = () => {
  const router = useRouter();
  // set and change the value of the search bar
  const [value, setValue] = useState<string>('');
  // but slow it down with this
  const debouncedValue = useDebounce<string>(value, 500);

  // runs whenever router or debouncedValue changes
  useEffect(() => {
    // query has a title of debouncedValue
    const query = {
      title: debouncedValue,
    };

    // set url to /search + query
    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });

    // and then we navigate to that url
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
