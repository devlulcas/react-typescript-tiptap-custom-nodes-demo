import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ClassValue } from 'clsx';

type EditorActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  active?: boolean;
  className?: ClassValue;
};

export function EditorActionButton({
  icon,
  label,
  onClick,
  disabled,
  active,
  className,
}: EditorActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'gap-2 flex-1 min-w-fit',
        { 'bg-violet-500 text-violet-50': active },
        className
      )}
    >
      {icon}

      <span className="sr-only whitespace-nowrap min-w-fit md:not-sr-only">{label}</span>
    </Button>
  );
}
