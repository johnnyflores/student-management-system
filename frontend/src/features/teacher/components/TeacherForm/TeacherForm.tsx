import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useTeachers } from '@/features/teacher/hooks/useTeachers';
import {
  teacherSchema,
  type TeacherSchemaType,
} from '@/features/teacher/schemas/teacher.schema';

const TeacherForm = (props: {
  isEdit?: boolean;
  teacherId?: string;
  onCloseDrawer?: () => void;
}) => {
  const { isEdit = false, teacherId, onCloseDrawer } = props;

  const {
    createTeacher,
    updateTeacher,
    searchTeacher,
    searchResult,
    isCreating,
    isUpdating,
    isLoading,
  } = useTeachers();

  const form = useForm<TeacherSchemaType>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      speciality: '',
    },
  });

  useEffect(() => {
    if (isEdit && teacherId) {
      searchTeacher(Number(teacherId));
    }
  }, [isEdit, teacherId, searchTeacher]);

  useEffect(() => {
    if (isEdit && searchResult) {
      form.reset({
        firstName: searchResult.firstName,
        lastName: searchResult.lastName,
        email: searchResult.email,
        speciality: searchResult.speciality,
      });
    }
  }, [isEdit, searchResult, form]);

  const onSubmit = async (values: TeacherSchemaType) => {
    try {
      if (isEdit && teacherId) {
        await updateTeacher({
          id: Number(teacherId),
          teacher: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            speciality: values.speciality,
          },
        });
        toast.success('Teacher updated successfully');
      } else {
        await createTeacher({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          speciality: values.speciality,
        });
        toast.success('Teacher created successfully');
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
                <FormLabel>Teacher ID</FormLabel>
                <FormControl>
                  <Input value={teacherId ?? ''} disabled />
                </FormControl>
              </FormItem>
            )}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speciality</FormLabel>
                  <FormControl>
                    <Input placeholder="Speciality" {...field} />
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
                <Loader className="animate-spin h-4 w-4 mr-2" />
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

export default TeacherForm;
