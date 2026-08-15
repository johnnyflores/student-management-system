import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
} from '@/features/student/schema/student-schema';

const StudentForm = (props: {
  isEdit?: boolean;
  studentId?: string;
  onCloseDrawer?: () => void;
}) => {
  const { isEdit = false, studentId, onCloseDrawer } = props;

  const {
    addStudent,
    updateStudent,
    createLoading,
    updateLoading,
    loading,
    searchedStudent,
    searchStudent,
    searchLoading,
  } = useStudents();

  const form = useForm<studentSchemaType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      Name: '',
      Age: 0,
      Grade: '',
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
        Name: searchedStudent.Name,
        Age: searchedStudent.Age,
        Grade: searchedStudent.Grade,
      });
    }
  }, [isEdit, searchedStudent, form]);

  const onSubmit = async (values: studentSchemaType) => {
    if (isEdit && studentId) {
      await updateStudent({
        id: Number(studentId),
        student: {
          ID: Number(studentId),
          Name: values.Name,
          Age: values.Age,
          Grade: values.Grade,
        },
      });
    } else {
      await addStudent({
        Name: values.Name,
        Age: values.Age,
        Grade: values.Grade,
      });
    }

    onCloseDrawer?.();
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
              name="Name"
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
              name="Age"
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
              name="Grade"
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
              disabled={createLoading || updateLoading}
            >
              {createLoading || updateLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : null}
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </div>
          {(loading || searchLoading) && (
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
