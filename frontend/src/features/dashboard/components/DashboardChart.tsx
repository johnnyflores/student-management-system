import { Bar, BarChart, CartesianGrid, Cell, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import useDashboardStats from '@/features/dashboard/hooks/useDashboardStats';
import type { StatCardColor } from '@/features/dashboard/types/dashboard';
import { statColors } from '@/features/dashboard/constants/statColors';

const chartConfig = {
  students: {
    label: 'Students',
    color: 'var(--chart-1)',
  },
  teachers: {
    label: 'Teachers',
    color: 'var(--chart-2)',
  },
  courses: {
    label: 'Courses',
    color: 'var(--chart-3)',
  },
  enrollments: {
    label: 'Enrollments',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

const DashboardChart = () => {
  const { data, isLoading, isError, error } = useDashboardStats();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Statistics</CardTitle>
          <CardDescription>Overview of your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-75 flex items-center justify-center">
            <p className="text-muted-foreground">Loading statistics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Statistics</CardTitle>
          <CardDescription>Overview of your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            {error?.message ?? 'Failed to load statistics'}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No statistics available.</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    {
      name: 'Students',
      value: data.students,
      color: 'blue',
    },
    {
      name: 'Teachers',
      value: data.teachers,
      color: 'green',
    },
    {
      name: 'Courses',
      value: data.courses,
      color: 'orange',
    },
    {
      name: 'Enrollments',
      value: data.enrollments,
      color: 'purple',
    },
  ] satisfies {
    name: string;
    value: number;
    color: StatCardColor;
  }[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Overview</CardTitle>
        <CardDescription>
          Students, teachers, courses and enrollments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={8}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={statColors[entry.color]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
