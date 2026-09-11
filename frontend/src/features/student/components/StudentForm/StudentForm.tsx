import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import useStudents from '@/features/student/hooks/useStudents';
import {
  studentSchema,
  type studentSchemaType,
} from '@/features/student/schemas/student.schema';

const StudentForm = (props: {
  isEdit?: boolean;
  studentId?: string;
  onCloseDrawer?: () => void;
}) => {
  const { isEdit = false, studentId, onCloseDrawer } = props;

  const {
    addStudent,
    updateStudent,
    isCreating,
    isUpdating,
    isLoading,
    searchedStudent,
    searchStudent,
    isSearching,
  } = useStudents();

  const form = useForm<studentSchemaType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '',
      age: 0,
      grade: '',
    },
  });

  useEffect(() => {
    if (isEdit && studentId) {
      searchStudent(Number(studentId));
    }
  }, [isEdit, studentId, searchStudent]);

  useEffect(() => {
    if (isEdit && searchedStudent) {
      form.reset({
        name: searchedStudent.name,
        age: searchedStudent.age,
        grade: searchedStudent.grade,
      });
    }
  }, [isEdit, searchedStudent, form]);

  const onSubmit = async (values: studentSchemaType) => {
    try {
      if (isEdit && studentId) {
        await updateStudent({
          id: Number(studentId),
          student: {
            name: values.name,
            age: values.age,
            grade: values.grade,
          },
        });
        toast.success('Student updated successfully');
      } else {
        await addStudent({
          name: values.name,
          age: values.age,
          grade: values.grade,
        });
        toast.success('Student added successfully');
      }
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
            {isEdit && (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input value={studentId ?? ''} disabled />
                </FormControl>
              </FormItem>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Age"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Grade</FormLabel>
                  <FormControl>
                    <Input placeholder="Grade" {...field} />
                  </FormControl>
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
          {(isLoading || isSearching) && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/70 dark:bg-background/70 z-50 flex justify-center">
              <Loader className="h-8 w-8 animate-spin" />
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default StudentForm;
