import { useMemo } from 'react';
import useDebouncedSearch from '@/hooks/useDebounceSearch';

export function useSearch<T extends object>(items: T[], delay = 500) {
  const { setSearchTerm, debouncedTerm } = useDebouncedSearch('', {
    delay,
  });

  const searchTerm = debouncedTerm.toLowerCase().trim();

  const data = useMemo(() => {
    if (!searchTerm) {
      return items;
    }

    return items.filter((item) => {
      const searchableText = Object.values(item)
        .filter((value) => value != null)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [items, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    data,
  };
}
