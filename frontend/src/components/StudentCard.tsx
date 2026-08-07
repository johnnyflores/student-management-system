import { Link } from 'react-router-dom';
import type { Student } from '../types/student';

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export default function StudentCard({
  student,
  onEdit,
  onDelete,
}: StudentCardProps) {
  return (
    <div>
      <h3>{student.Name}</h3>
      <p>ID: {student.ID}</p>
      <p>Age: {student.Age}</p>
      <p>Grade: {student.Grade}</p>
      <button onClick={() => onEdit(student)}>Edit</button>
      <button onClick={() => onDelete(student.ID)}>Delete</button>
      <Link to={`/students/${student.ID}`}>View Details</Link>
    </div>
  );
}
