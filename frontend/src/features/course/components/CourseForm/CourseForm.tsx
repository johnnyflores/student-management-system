import useCourses from '@/features/course/hooks/useCourses';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
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
import { getErrorMessage } from '@/utils/error';

type CourseFormProps = {
  isEdit?: boolean;
  courseId?: string;
  onCloseDrawer?: () => void;
};

const CourseForm = (props: CourseFormProps) => {
  const { isEdit = false, courseId, onCloseDrawer } = props;
  const {
    createCourse,
    isCreating,
    isLoading,
    updateCourse,
    isUpdating,
    searchCourse,
    searchResult,
  } = useCourses();

  const { teachers, isLoading: isLoadingTeachers } = useTeachers();

  const form = useForm<courseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      teacherId: 0,
    },
  });

  useEffect(() => {
    if (isEdit && courseId) {
      searchCourse(Number(courseId));
    }
  }, [isEdit, courseId, searchCourse]);

  useEffect(() => {
    if (isEdit && searchResult) {
      form.reset({
        name: searchResult.name,
        teacherId: searchResult.teacherId,
      });
    }
  }, [isEdit, form, searchResult]);

  const onSubmit = async (values: courseSchemaType) => {
    const payload = {
      name: values.name,
      teacherId: values.teacherId,
    };
    try {
      if (isEdit && courseId) {
        await updateCourse({
          id: Number(courseId),
          course: {
            ...payload,
          },
        });
        toast.success('Course updated successfully');
      } else {
        await createCourse({
          ...payload,
        });
        toast.success('Course created successfully');
      }
      onCloseDrawer?.();
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleSelectChange = (
    onChange: (value: number) => void,
    value: number
  ) => {
    if (value !== 0) {
      onChange(value);
    }
  };

  return (
    <div className="relative pb-10 pt-5 px-2.5">
      <Form {...form}>
        <form className="space-y-6 px-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
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
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Teacher Name</FormLabel>
                  {isLoadingTeachers ? (
                    <p className="text-sm text-muted-foreground">
                      Loading teachers...
                    </p>
                  ) : (
                    <Select
                      onValueChange={(value) => {
                        handleSelectChange(field.onChange, Number(value));
                      }}
                      value={String(field.value)}
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
            <Button
              type="submit"
              className="w-full"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : null}

              {isEdit ? 'Update' : 'Save'}
            </Button>
          </div>
          {isLoading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/70 dark:bg-background/70 z-50 flex justify-center">
              <Loader className="h-8 w-8 animate-spin" />
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CourseForm;
