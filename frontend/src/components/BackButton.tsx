import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { ComponentProps } from 'react';

interface BackButtonProps extends ComponentProps<typeof Button> {
  to: string;
  label?: string;
}

const BackButton = ({
  to,
  label = 'Back',
  ...buttonProps
}: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button {...buttonProps} onClick={() => navigate(to)}>
      <ArrowLeft />
      {label}
    </Button>
  );
};

export default BackButton;
