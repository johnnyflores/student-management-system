import { ROUTES } from '@/routes/common/routePath';
import { Airplay } from 'lucide-react';
import { Link } from 'react-router-dom';

type LogoProps = {
  url?: string;
};

const Logo = (props: LogoProps) => {
  return (
    <Link
      to={props.url || ROUTES.DASHBOARD}
      className="flex items-center gap-2"
    >
      <div className="bg-orange-500 text-muted-foreground h-6.5 w-6.5 rounded flex items-center justify-center">
        <Airplay className="h-4 w-4 text-white" />
      </div>
      <span className="text-accent-foreground text-[18px] font-semibold">
        Student Management
      </span>
    </Link>
  );
};

export default Logo;
