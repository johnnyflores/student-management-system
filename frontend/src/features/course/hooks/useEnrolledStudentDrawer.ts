import useCourseDrawer from '@/features/course/hooks/useCourseDrawer';

const useEnrolledStudentDrawer = () => {
  return useCourseDrawer({
    openKey: 'enrolled',
    courseIdKey: 'enrolledCourseId',
  });
};

export default useEnrolledStudentDrawer;
