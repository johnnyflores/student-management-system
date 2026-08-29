import useQueryDrawer from '@/hooks/useQueryDrawer';

const useAssignStudentDrawer = () => {
  return useQueryDrawer({ openKey: 'assign', idKey: 'assignCourseId' });
};

export default useAssignStudentDrawer;
