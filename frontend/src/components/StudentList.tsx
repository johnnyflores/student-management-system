import { useEffect, useState } from 'react';
import { getStudents } from '../services/studentApi';
import type { Student } from '../types/student';

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    getStudents().then(setStudents).catch(console.error);
  }, []);

  return (
    <ul>
      {students.map((student) => (
        <li key={student.ID}>{student.Name}</li>
      ))}
    </ul>
  );
}
