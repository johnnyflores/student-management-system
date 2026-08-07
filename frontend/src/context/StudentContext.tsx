import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Student } from '../types/student';
import {
  createStudent as apiCreateStudent,
  deleteStudent as apiDeleteStudent,
  getStudents,
  updateStudent as apiUpdateStudent,
  getStudent,
} from '../services/studentApi';

interface StudentContextType {
  students: Student[];
  loading: boolean;
  error: string;
  addStudent: (student: Student) => Promise<void>;
  updateStudent: (id: number, student: Student) => Promise<void>;
  removeStudent: (id: number) => Promise<void>;
  searchStudent: (id: number) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getStudents();

        setStudents(data);
      } catch {
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const addStudent = async (student: Student) => {
    try {
      const created = await apiCreateStudent(student);

      setStudents((prev) => [...prev, created]);
    } catch {
      setError('Failed to create student');
    }
  };

  const updateStudent = async (id: number, student: Student) => {
    try {
      const updated = await apiUpdateStudent(id, student);

      setStudents((prev) =>
        prev.map((item) => (item.ID === id ? updated : item))
      );
    } catch {
      setError('Failed to update student');
    }
  };

  const removeStudent = async (id: number) => {
    try {
      await apiDeleteStudent(id);

      setStudents((prev) => prev.filter((item) => item.ID !== id));
    } catch {
      setError('Failed to delete student');
    }
  };

  const searchStudent = async (id: number) => {
    try {
      const student = await getStudent(id);

      setStudents([student]);
    } catch {
      setError('Student not found');
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        addStudent,
        updateStudent,
        removeStudent,
        searchStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
export { StudentContext };
