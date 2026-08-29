import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useStudents from '@/features/student/hooks/useStudents';
import useCourseStudents from '@/features/course/hooks/useCourseStudents';
import {
  assignStudentSchema,
  type assignStudentSchemaType,
} from '@/features/course/schema/assign-student-schema';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';

type AssignStudentFormProps = {
  courseId?: string;
  courseName?: string;
  teacher?: string;
  onCloseDrawer?: () => void;
};

const AssignStudentForm = (props: AssignStudentFormProps) => {
  const { courseId, courseName, teacher, onCloseDrawer } = props;

  const { students: enrolledStudents, assignStudent } = useCourseStudents(
    courseId ? parseInt(courseId) : 0
  );
  const { students: allStudents, loading: isLoadingStudents } = useStudents();
  const enrolledStudentIds = new Set(
    enrolledStudents.map((student) => student.ID)
  );

  const availableStudents = allStudents.filter(
    (student) => !enrolledStudentIds.has(student.ID)
  );

  const form = useForm<assignStudentSchemaType>({
    resolver: zodResolver(assignStudentSchema),
    defaultValues: {
      Student: 0,
    },
  });

  const onSubmit = async (values: assignStudentSchemaType) => {
    try {
      await assignStudent(values.Student, {
        onSuccess: () => {
          toast.success('Student assigned successfully');
          onCloseDrawer?.();
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="relative pb-10 pt-5 px-2.5">
      <Form {...form}>
        <form className="space-y-6 px-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormItem>
              <FormLabel>Course ID</FormLabel>
              <FormControl>
                <Input value={courseId ?? ''} disabled />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input value={courseName ?? ''} disabled />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <FormControl>
                <Input value={teacher ?? ''} disabled />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="Student"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Student</FormLabel>
                  {isLoadingStudents ? (
                    <p className="text-sm text-muted-foreground">
                      Loading students...
                    </p>
                  ) : (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ''}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableStudents.map((student) => (
                          <SelectItem
                            key={student.ID}
                            value={String(student.ID)}
                          >
                            {student.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {availableStudents.length === 0 && !isLoadingStudents && (
            <p className="text-sm text-muted-foreground">
              All students are already enrolled.
            </p>
          )}
          <div className="sticky bottom-0 bg-white dark:bg-background pb-2">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoadingStudents}
            >
              {isLoadingStudents ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : null}
              {isLoadingStudents ? 'Assigning...' : 'Assign Student'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AssignStudentForm;
