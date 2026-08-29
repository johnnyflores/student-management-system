import useCourseDrawer from '@/features/course/hooks/useCourseDrawer';

const useAssignStudentDrawer = () => {
  return useCourseDrawer({ openKey: 'assign', courseIdKey: 'assignCourseId' });
};

export default useAssignStudentDrawer;
