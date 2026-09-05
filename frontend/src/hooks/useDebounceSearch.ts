import { useCallback, useEffect, useState } from 'react';

interface UseDebounceSearchOptions {
  delay?: number;
  immediate?: boolean;
}

const useDebouncedSearch = (
  initialValue: string,
  options: UseDebounceSearchOptions = {}
) => {
  const { delay = 500, immediate = false } = options;

  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedTerm, setDebouncedTerm] = useState(initialValue);

  const setSearchTermDebounced = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    const timeoutDelay = immediate && searchTerm === initialValue ? 0 : delay;

    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, timeoutDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay, immediate, initialValue]);

  return { searchTerm, setSearchTerm: setSearchTermDebounced, debouncedTerm };
};

export default useDebouncedSearch;
