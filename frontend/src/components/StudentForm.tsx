import { useState } from 'react';
import type { Student } from '../types/student';

interface StudentFormProps {
  onSubmit: (student: Student) => void;
  student?: Student;
}

const emptyStudent: Student = {
  ID: 0,
  Name: '',
  Age: 0,
  Grade: '',
};

export default function StudentForm({
  onSubmit,
  student: editingStudent,
}: StudentFormProps) {
  const [student, setStudent] = useState<Student>(
    editingStudent ?? emptyStudent
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setStudent({
      ...student,
      [name]: name === 'ID' || name === 'Age' ? Number(value) : value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(student);

    if (!editingStudent) {
      setStudent(emptyStudent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>

      <div>
        <label>ID:</label>

        <input
          type="number"
          name="ID"
          value={student.ID}
          onChange={handleChange}
          disabled={!!editingStudent}
        />
      </div>

      <div>
        <label>Name:</label>

        <input
          type="text"
          name="Name"
          value={student.Name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Age:</label>

        <input
          type="number"
          name="Age"
          value={student.Age}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Grade:</label>

        <input
          type="text"
          name="Grade"
          value={student.Grade}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {editingStudent ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
}
