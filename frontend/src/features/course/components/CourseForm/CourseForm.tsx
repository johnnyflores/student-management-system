import useCourses from '@/features/course/hooks/useCourses';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  courseSchema,
  type courseSchemaType,
} from '@/features/course/schemas/course.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useTeachers } from '@/features/teacher/hooks/useTeachers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CourseFormProps = {
  onCloseDrawer?: () => void;
};

const CourseForm = (props: CourseFormProps) => {
  const { onCloseDrawer } = props;
  const { createCourse, isCreating } = useCourses();

  const { teachers, isLoading: isLoadingTeachers } = useTeachers();

  const form = useForm<courseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      Name: '',
      TeacherID: 0,
    },
  });

  const onSubmit = async (values: courseSchemaType) => {
    try {
      await createCourse({
        Name: values.Name,
        TeacherID: values.TeacherID,
      });
      toast.success('Course created successfully');
      onCloseDrawer?.();
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
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Course Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Course Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TeacherID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Teacher Name</FormLabel>
                  {isLoadingTeachers ? (
                    <p className="text-sm text-muted-foreground">
                      Loading teachers...
                    </p>
                  ) : (
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : ''}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem
                            key={teacher.id}
                            value={String(teacher.id)}
                          >
                            {teacher.firstName} {teacher.lastName}
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
          <div className="sticky bottom-0 bg-white dark:bg-background pb-2">
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating && <Loader className="h-4 w-4 animate-spin" />}
              {isCreating ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseForm;
