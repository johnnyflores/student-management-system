import useQueryDrawer from '@/hooks/useQueryDrawer';

const useEditTeacherDrawer = () => {
  return useQueryDrawer({ openKey: 'edit', idKey: 'teacherId' });
};

export default useEditTeacherDrawer;
