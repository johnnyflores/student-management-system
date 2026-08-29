export const ROUTES = {
  DASHBOARD: '/',
  STUDENTS: '/students',
  COURSES: '/courses',
  STUDENT_DETAILS: (id: string) => `/students/${id}`,
  COURSE_DETAILS: (id: string) => `/courses/${id}`,
};
