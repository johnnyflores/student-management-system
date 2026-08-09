import Table from '@/components/Table';
import useStudents from '@/features/student/hooks/useStudents';

const StudentTable = () => {
  const { students, loading, error } = useStudents();
  const listNameTable = [
    {
      name: 'ID',
    },
    {
      name: 'Name',
    },
    {
      name: 'Grade',
    },
    {
      name: 'Actions',
    },
  ];
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {loading && <p>Loading students...</p>}
        {error && <p className="text-red-500">Failed to load students</p>}
        {!loading && !error && students.length === 0 && (
          <p>No students found.</p>
        )}
        {!loading && !error && students.length > 0 && (
          <Table>
            <Table.Header>
              {listNameTable.map((item) => (
                <th key={item.name} className="border border-gray-300 p-2">
                  {item.name}
                </th>
              ))}
            </Table.Header>
            <Table.Body
              data={students}
              render={(student) => (
                <tr key={student.ID}>
                  <td className="border border-gray-300 p-2">{student.ID}</td>
                  <td className="border border-gray-300 p-2">{student.Name}</td>
                  <td className="border border-gray-300 p-2">
                    {student.Grade}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {/* TODO Add action buttons here */}
                  </td>
                </tr>
              )}
            />
          </Table>
        )}
      </div>
    </>
  );
};

export default StudentTable;
