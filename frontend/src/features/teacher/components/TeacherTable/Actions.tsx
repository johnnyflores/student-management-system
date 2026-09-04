import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { EyeIcon, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import useEditTeacherDrawer from '@/features/teacher/hooks/useEditTeacherDrawer';
import { useTeachers } from '@/features/teacher/hooks/useTeachers';
import ConfirmDialog from '@/components/Dialogs/ConfirmDialog';

const Actions = ({ row }: { row: { original: { ID: number } } }) => {
  const teacherId = row.original.ID;
  const { deleteTeacher } = useTeachers();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { onOpenDrawer } = useEditTeacherDrawer();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTeacher(teacherId);
      toast.success('Teacher deleted successfully');
      setDeleteDialogOpen(false);
    } catch (err) {
      toast.error('Failed to delete teacher');
      console.error('Failed to delete teacher', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            aria-label="Open teacher actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onOpenDrawer(teacherId)}>
            <Pencil className="mr-1 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/teachers/${teacherId}`} className="flex items-center">
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
        title="Delete teacher?"
        description={`Are you sure you want to delete this teacher? This action cannot be undone.`}
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
