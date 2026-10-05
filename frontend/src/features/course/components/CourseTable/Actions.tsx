import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  EyeIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserRoundArrowLeft,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import useAssignStudentDrawer from '@/features/course/hooks/useAssignStudentDrawer';
import { ROUTES } from '@/routes/common/routePath';
import useCourses from '@/features/course/hooks/useCourses';
import ConfirmDialog from '@/components/Dialogs/ConfirmDialog';
import { useQueryErrorToast } from '@/hooks/useQueryErrorToast';

const Actions = ({ row }: { row: { original: { id: number } } }) => {
  const courseId = row.original.id;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { deleteCourse, isDeleting, deleteError } = useCourses();

  useQueryErrorToast(deleteError);

  const { onOpenDrawer: openAssignStudentDrawer } = useAssignStudentDrawer();

  const handleDelete = async () => {
    try {
      await deleteCourse(courseId);

      toast.success('Course deleted successfully');
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  //TODO: Implement edit functionality for the course

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            aria-label="Open course actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Pencil className="mr-1 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openAssignStudentDrawer(courseId)}>
            <UserRoundArrowLeft className="mr-1 h-4 w-4" />
            Assign Student
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to={ROUTES.COURSE_ENROLLMENTS(String(courseId))}
              className="flex items-center"
            >
              <Users className="mr-1 h-4 w-4" />
              Enrolled Students
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/courses/${courseId}`} className="flex items-center">
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
        title="Delete course?"
        description={
          <>
            Are you sure you want to delete course
            <strong className="text-red-500">#{courseId}</strong>? This action
            cannot be undone.
          </>
        }
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
