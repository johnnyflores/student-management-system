import { Link } from 'react-router-dom';
import { EyeIcon, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import useStudents from '@/features/student/hooks/useStudents';

const Actions = ({ row }: { row: { original: { ID: number } } }) => {
  const { removeStudent, clearSearch } = useStudents();
  const studentId = row.original.ID;

  const handleEdit = () => {
    //TODO: Implement edit functionality
  };

  const handleDelete = async (id: number) => {
    try {
      await removeStudent(id);
      toast.success('Student deleted successfully');
      clearSearch();
    } catch (err) {
      toast.error('Failed to delete student');
      console.error('Failed to delete student', err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className="mr-1 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={`/students/${studentId}`} className="flex items-center">
            <EyeIcon className="mr-1 h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(studentId)}>
          <Trash2 className="mr-1 h-4 w-4 text-destructive!" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
