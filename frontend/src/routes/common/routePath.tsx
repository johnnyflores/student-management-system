export const ROUTES = {
  DASHBOARD: '/',
  STUDENTS: '/students',
  COURSES: '/courses',
  STUDENT_DETAILS: (id: string) => `/students/${id}`,
};
