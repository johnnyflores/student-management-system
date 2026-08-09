import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Student } from '../types/student';
import { getStudent } from '../services/studentApi';

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStudent = async () => {
      try {
        if (!id) {
          return;
        }
        const data = await getStudent(Number(id));
        setStudent(data);
      } catch (err) {
        setError('Student not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStudent();
  }, [id]);

  if (loading) {
    return <p>Loading student...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!student) {
    return <p>No student data</p>;
  }

  return (
    <div>
      <h1>Student Details</h1>
      <p>ID: {student.ID}</p>
      <p>Name: {student.Name}</p>
      <p>Age: {student.Age}</p>
      <p>Grade: {student.Grade}</p>
    </div>
  );
}
