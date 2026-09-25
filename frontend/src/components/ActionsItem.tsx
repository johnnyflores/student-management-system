interface InfoItemProps {
  title: string;
  description: string;
  btnAction?: React.ReactNode;
}

const ActionsItem = ({ title, description, btnAction }: InfoItemProps) => {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg">
        {btnAction}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
};

export default ActionsItem;
