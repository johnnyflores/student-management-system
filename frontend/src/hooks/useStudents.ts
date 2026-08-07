import { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error('useStudents must be used inside StudentProvider');
  }

  return context;
}
