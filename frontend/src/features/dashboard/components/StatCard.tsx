import type { StatCard as StatCardType } from '@/features/dashboard/types/dashboard';
import { colorStyles } from '@/constants/colorStyles';

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  color,
}: StatCardType) => {
  const styles = colorStyles[color];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </h2>
          <p className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${styles.background}`}
        >
          <Icon className={`size-5 ${styles.icon}`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
