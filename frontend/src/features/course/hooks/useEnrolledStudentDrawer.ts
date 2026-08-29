import useQueryDrawer from '@/hooks/useQueryDrawer';

const useEnrolledStudentDrawer = () => {
  return useQueryDrawer({
    openKey: 'enrolled',
    idKey: 'enrolledCourseId',
  });
};

export default useEnrolledStudentDrawer;
