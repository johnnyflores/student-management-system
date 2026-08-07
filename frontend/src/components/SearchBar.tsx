import { useState } from 'react';

interface SearchBarProps {
  onSearch: (id: number) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [id, setId] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (id <= 0) {
      return;
    }

    onSearch(id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Search student by ID"
        value={id}
        onChange={(event) => setId(Number(event.target.value))}
      />

      <button type="submit">Search</button>
    </form>
  );
}
