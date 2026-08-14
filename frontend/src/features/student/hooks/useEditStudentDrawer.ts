import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';
const useEditStudentDrawer = () => {
  const [open, setOpen] = useQueryState(
    'edit',
    parseAsBoolean.withDefault(false)
  );

  const [studentId, setStudentId] = useQueryState(
    'studentId',
    parseAsString.withDefault('')
  );

  const onOpenDrawer = (studentId: number) => {
    setStudentId(studentId.toString());
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setStudentId('');
    setOpen(false);
  };

  return {
    open,
    studentId,
    onOpenDrawer,
    onCloseDrawer,
  };
};

export default useEditStudentDrawer;
