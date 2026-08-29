import useQueryDrawer from '@/hooks/useQueryDrawer';

const useEditStudentDrawer = () => {
  return useQueryDrawer({
    openKey: 'edit',
    idKey: 'studentId',
  });
};

export default useEditStudentDrawer;
