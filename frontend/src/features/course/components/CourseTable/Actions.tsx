import {
  EyeIcon,
  MoreHorizontal,
  UserRoundArrowLeft,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAssignStudentDrawer from '@/features/course/hooks/useAssignStudentDrawer';
import useEnrolledStudentDrawer from '@/features/course/hooks/useEnrolledStudentDrawer';
import { Link } from 'react-router-dom';

const Actions = ({ row }: { row: { original: { ID: number } } }) => {
  const courseId = row.original.ID;

  const { onOpenDrawer: openAssignStudentDrawer } = useAssignStudentDrawer();

  const { onOpenDrawer: openEnrolledStudentDrawer } =
    useEnrolledStudentDrawer();

  return (
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
        <DropdownMenuItem onClick={() => openAssignStudentDrawer(courseId)}>
          <UserRoundArrowLeft className="mr-1 h-4 w-4" />
          Assign Student
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openEnrolledStudentDrawer(courseId)}>
          <Users className="mr-1 h-4 w-4" />
          Enrolled Students
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/courses/${courseId}`} className="flex items-center">
            <EyeIcon className="mr-1 h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
