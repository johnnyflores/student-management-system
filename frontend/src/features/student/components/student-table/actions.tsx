import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import useStudents from '@/features/student/hooks/useStudents';
import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import useEditStudentDrawer from '@/features/student/hooks/useEditStudentDrawer';

const Actions = ({ row }: { row: { original: { ID: number } } }) => {
  const { removeStudent } = useStudents();
  const studentId = row.original.ID;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { onOpenDrawer } = useEditStudentDrawer();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await removeStudent(studentId);
      toast.success('Student deleted successfully');
      setDeleteDialogOpen(false);
    } catch (err) {
      toast.error('Failed to delete student');
      console.error('Failed to delete student', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onOpenDrawer(studentId)}>
            <Pencil className="mr-1 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/students/${studentId}`} className="flex items-center">
              <EyeIcon className="mr-1 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-1 h-4 w-4 text-destructive!" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete student?"
        description="Are you sure you want to delete this student? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        isLoading={isDeleting}
        destructive
      />
    </>
  );
};

export default Actions;
