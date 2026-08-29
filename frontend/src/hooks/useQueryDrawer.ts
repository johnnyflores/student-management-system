import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';

interface UseQueryDrawerOptions {
  openKey: string;
  idKey: string;
}

const useQueryDrawer = ({ openKey, idKey }: UseQueryDrawerOptions) => {
  const [open, setOpen] = useQueryState(
    openKey,
    parseAsBoolean.withDefault(false)
  );

  const [id, setId] = useQueryState(idKey, parseAsString.withDefault(''));

  const onOpenDrawer = (id: number) => {
    setId(String(id));
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
    setId('');
  };

  return {
    open,
    id,
    onOpenDrawer,
    onCloseDrawer,
  };
};

export default useQueryDrawer;
