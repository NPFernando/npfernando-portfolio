import type { ReactNode } from 'react';
import clsx from 'clsx';

type CardProps = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

const Card = ({ title, subtitle, actions, children, className }: CardProps) => (
  <div className={clsx('card p-6', className)}>
    {(title || subtitle || actions) && (
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-[var(--muted)]">{subtitle}</p>}
        </div>
        {actions}
      </div>
    )}
    <div className="space-y-3 text-sm leading-relaxed text-[var(--muted)]">{children}</div>
  </div>
);

export default Card;
