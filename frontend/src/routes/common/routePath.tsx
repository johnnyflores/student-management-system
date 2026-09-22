export const ROUTES = {
  DASHBOARD: '/',
  STUDENTS: '/students',
  COURSES: '/courses',
  TEACHERS: '/teachers',
  ENROLLMENTS: '/enrollments',
  STUDENT_DETAILS: (id: string) => `/students/${id}`,
  COURSE_DETAILS: (id: string) => `/courses/${id}`,
  COURSE_ENROLLMENTS: (id: string) => `/courses/${id}/enrollments`,
  TEACHER_DETAILS: (id: string) => `/teachers/${id}`,
};
