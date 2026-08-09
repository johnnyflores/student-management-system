import type { ReactNode } from 'react';

type TableProps = {
  children: ReactNode;
};

type HeaderProps = {
  children: ReactNode;
};

type BodyProps<T> = {
  data: T[];
  render: (item: T, index: number) => ReactNode;
};

function Table({ children }: TableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      {children}
    </table>
  );
}

function Header({ children }: HeaderProps) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) {
    return <span>No data</span>;
  }

  return <tbody>{data.map(render)}</tbody>;
}

Table.Header = Header;
Table.Body = Body;

export default Table;
