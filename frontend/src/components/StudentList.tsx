import { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import type { Student } from '../types/student';
import StudentForm from './StudentForm';
import StudentCard from './StudentCard';
import SearchBar from './SearchBar';

export default function StudentList() {
  const {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    removeStudent,
    searchStudent,
  } = useStudents();

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  if (loading) {
    return <p>Loading students...</p>;
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (id: number) => {
    await removeStudent(id);
  };

  const handleSearch = async (id: number) => {
    await searchStudent(id);
  };

  const handleSubmit = async (student: Student) => {
    if (editingStudent) {
      await updateStudent(student.ID, student);

      setEditingStudent(null);
    } else {
      await addStudent(student);
    }
  };

  return (
    <div>
      <h1>Students</h1>

      {error && <p>{error}</p>}

      <SearchBar onSearch={handleSearch} />

      <StudentForm
        key={editingStudent?.ID ?? 'new'}

        student={editingStudent ?? undefined}

        onSubmit={handleSubmit}
      />

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        students.map((student) => (
          <StudentCard
            key={student.ID}

            student={student}

            onEdit={handleEdit}

            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
