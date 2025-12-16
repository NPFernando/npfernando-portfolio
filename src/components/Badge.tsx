import type { ReactNode } from 'react';
import clsx from 'clsx';

type BadgeProps = {
  children: ReactNode;
  tone?: 'default' | 'success' | 'warning' | 'info';
};

const toneClasses: Record<Required<BadgeProps>['tone'], string> = {
  default: 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-100',
  success: 'bg-accent-100 text-primary-900 dark:bg-accent-400/20 dark:text-accent-200',
  warning: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-100',
  info: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
};

const Badge = ({ children, tone = 'default' }: BadgeProps) => (
  <span className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', toneClasses[tone])}>
    {children}
  </span>
);

export default Badge;
