import type { GradeLevel } from '@/constants/gradeLevels';
import { gradeLevelColors } from '@/constants/gradeLevelColors';

type AvatarProps = {
  firstName: string;
  lastName: string;
  gradeLevel?: GradeLevel;
};

const Avatar = ({ firstName, lastName, gradeLevel }: AvatarProps) => {
  const colors = gradeLevel
    ? gradeLevelColors[gradeLevel]
    : { bg: 'bg-blue-100', text: 'text-blue-600' };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${colors.bg} text-xs font-semibold ${colors.text}`}
      >
        {firstName.charAt(0)}
      </div>
      <span className="font-medium text-accent-foreground">
        {firstName} {lastName}
      </span>
    </div>
  );
};

export default Avatar;
