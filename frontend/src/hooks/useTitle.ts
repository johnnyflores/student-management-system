import { useEffect } from 'react';

type PageTitleProps = {
  title: string;
};
const useTitle = ({ title }: PageTitleProps) => {
  useEffect(() => {
    document.title = `${title} | Student Management System`;
  }, [title]);

  return null;
};

export default useTitle;
