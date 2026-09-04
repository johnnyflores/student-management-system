import useQueryDrawer from '@/hooks/useQueryDrawer';

const useEditTeacherDrawer = () => {
  return useQueryDrawer({ openKey: 'editTeacher', idKey: 'teacherId' });
};

export default useEditTeacherDrawer;
