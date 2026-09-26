const StudentName = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
        {firstName.charAt(0)}
      </div>
      <span className="font-medium text-accent-foreground">
        {firstName} {lastName}
      </span>
    </div>
  );
};

export default StudentName;
