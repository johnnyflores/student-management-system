import { CircleAlert } from 'lucide-react';
import BackButton from '@/components/BackButton';

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-destructive/10">
          <CircleAlert className="size-8 text-destructive" />
        </div>
        <p className="text-7xl font-bold tracking-tight text-primary">404</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <BackButton to="/" label="Back to Dashboard" />
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
