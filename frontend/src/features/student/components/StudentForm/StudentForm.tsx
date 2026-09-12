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
  gradeLevels,
  studentSchema,
  studentStatuses,
  type StudentSchemaType,
} from '@/features/student/schemas/student.schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toApiDate, toInputDate } from '@/utils/date';

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

  const form = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      grade: '1',
      status: 'active',
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
        firstName: searchedStudent.firstName,
        lastName: searchedStudent.lastName,
        email: searchedStudent.email,
        phone: searchedStudent.phone,
        dateOfBirth: toInputDate(searchedStudent.dateOfBirth),
        grade: searchedStudent.grade,
        status: searchedStudent.status,
      });
    }
  }, [isEdit, searchedStudent, form]);

  const onSubmit = async (values: StudentSchemaType) => {
    try {
      const dateOfBirth = toApiDate(values.dateOfBirth);
      if (isEdit && studentId && searchedStudent) {
        await updateStudent({
          id: Number(studentId),
          student: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            dateOfBirth,
            grade: values.grade,
            status: values.status,
          },
        });
        toast.success('Student updated successfully');
      } else {
        await addStudent({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          dateOfBirth,
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
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
                  <FormLabel className="font-normal!">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
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
                  <FormLabel className="font-normal!">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal!">Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a grade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradeLevels.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEdit && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal!">Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studentStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
