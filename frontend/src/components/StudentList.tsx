import { useState } from 'react';
import useStudents from '../hooks/useStudents';
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
    searchedStudent,
    searchLoading,
    searchError,
    clearSearch,
    createLoading,
    updateLoading,
    deleteLoading,
  } = useStudents();

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [actionError, setActionError] = useState('');

  if (loading) {
    return <p>Loading students...</p>;
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (id: number) => {
    try {
      await removeStudent(id);
      clearSearch();
    } catch (err) {
      setActionError('Failed to delete student');
      console.error(err);
    }
  };

  const handleSearch = (id: number) => {
    searchStudent(id);
  };

  const handleSubmit = async (student: Student) => {
    try {
      if (editingStudent) {
        await updateStudent({
          id: student.ID,
          student,
        });

        clearSearch();
        setEditingStudent(null);
      } else {
        await addStudent(student);
      }
    } catch (err) {
      setActionError('Failed to save student');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Students</h1>

      {error && <p>Failed to load students</p>}
      {actionError && <p>{actionError}</p>}

      <SearchBar onSearch={handleSearch} />

      {searchLoading && <p>Searching...</p>}
      {searchError && <p>Student not found</p>}

      <StudentForm
        key={editingStudent?.ID ?? 'new'}
        student={editingStudent ?? undefined}
        onSubmit={handleSubmit}
        loading={createLoading || updateLoading}
      />

      {searchedStudent ? (
        <StudentCard
          student={searchedStudent}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        students.map((student) => (
          <StudentCard
            key={student.ID}
            student={student}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deleting={deleteLoading}
          />
        ))
      )}
    </div>
  );
}
