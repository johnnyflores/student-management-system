import type { LucideIcon } from 'lucide-react';

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

const InfoItem = ({ icon: Icon, label, value }: InfoItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  );
};

export default InfoItem;
