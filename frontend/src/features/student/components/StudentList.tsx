import { useState } from 'react';

import SearchBar from '@/components/SearchBar';
import useStudents from '../hooks/useStudents';
import type { Student } from '../types/student';
import StudentForm from './StudentForm';
import StudentCard from './StudentCard';
import StudentTable from './StudentTable';

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
    searchStudentsByName,
    searchLoading,
    searchError,
    clearSearch,
    createLoading,
    updateLoading,
    deleteLoading,
  } = useStudents();

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [actionError, setActionError] = useState('');
  const [searchText, setSearchText] = useState('');

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

  const searchStudentsByNameHandler = (name: string) => {
    setSearchText(name);
    searchStudentsByName(name);
  };

  const filteredStudents = students.filter((student) =>
    student.Name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <StudentTable />
      <h1>Students</h1>
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-4 p-2 border border-gray-300 rounded"
        value={searchText}
        onChange={(e) => {
          searchStudentsByNameHandler(e.target.value);
        }}
      />

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
          deleting={deleteLoading}
        />
      ) : filteredStudents.length === 0 ? (
        <p>No students found</p>
      ) : (
        filteredStudents.map((student) => (
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
