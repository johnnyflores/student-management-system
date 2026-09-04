export const ROUTES = {
  DASHBOARD: '/',
  STUDENTS: '/students',
  COURSES: '/courses',
  TEACHERS: '/teachers',
  STUDENT_DETAILS: (id: string) => `/students/${id}`,
  COURSE_DETAILS: (id: string) => `/courses/${id}`,
  TEACHER_DETAILS: (id: string) => `/teachers/${id}`,
};
