import useCourses from '@/features/course/hooks/useCourses';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  courseSchema,
  type courseSchemaType,
} from '@/features/course/schema/course-schema';
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

type CourseFormProps = {
  onCloseDrawer?: () => void;
};

const CourseForm = (props: CourseFormProps) => {
  const { onCloseDrawer } = props;
  const { createCourse, isCreating } = useCourses();

  const form = useForm<courseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      Name: '',
      Teacher: '',
    },
  });

  const onSubmit = async (values: courseSchemaType) => {
    try {
      await createCourse({
        Name: values.Name,
        Teacher: values.Teacher,
      });
      toast.success('Course created successfully');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
    onCloseDrawer?.();
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
              name="Teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Teacher Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Teacher Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sticky bottom-0 bg-white dark:bg-background pb-2">
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? <Loader className="h-4 w-4 animate-spin" /> : null}
              {isCreating ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseForm;
