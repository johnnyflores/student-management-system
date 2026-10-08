import useQueryDrawer from '@/hooks/useQueryDrawer';

const useEditCourseDrawer = () => {
  return useQueryDrawer({
    openKey: 'editCourse',
    idKey: 'courseId',
  });
};

export default useEditCourseDrawer;
