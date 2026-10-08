import React from 'react';
import { cn } from '../../utils/cn';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor: _spotlightColor,
  ...props
}) => {
  return (
    <div
      className={cn('relative rounded-lg overflow-hidden theme-card transition-all duration-300', className)}
      {...props}
    >
      {children}
    </div>
  );
};
