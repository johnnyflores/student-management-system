import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';

type UseCourseDrawerOptions = {
  openKey: string;
  courseIdKey: string;
};

const useCourseDrawer = ({ openKey, courseIdKey }: UseCourseDrawerOptions) => {
  const [open, setOpen] = useQueryState(
    openKey,
    parseAsBoolean.withDefault(false)
  );

  const [courseId, setCourseId] = useQueryState(
    courseIdKey,
    parseAsString.withDefault('')
  );

  const onOpenDrawer = (courseId: number) => {
    setCourseId(String(courseId));
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
    setCourseId('');
  };

  return {
    open,
    courseId,
    onOpenDrawer,
    onCloseDrawer,
  };
};

export default useCourseDrawer;
