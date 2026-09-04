import useQueryDrawer from '@/hooks/useQueryDrawer';

const useEditStudentDrawer = () => {
  return useQueryDrawer({
    openKey: 'editStudent',
    idKey: 'studentId',
  });
};

export default useEditStudentDrawer;
