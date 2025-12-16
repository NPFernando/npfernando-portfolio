import type { ReactNode } from 'react';
import clsx from 'clsx';

type SectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

const Section = ({ id, title, eyebrow, description, children, className }: SectionProps) => (
  <section id={id} className={clsx('py-14 sm:py-16', className)} aria-labelledby={`${id}-title`}>
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        {eyebrow && <span className="tag w-fit uppercase tracking-widest">{eyebrow}</span>}
        <h2 id={`${id}-title`} className="text-2xl font-semibold sm:text-3xl">
          {title}
        </h2>
        {description && <p className="max-w-3xl text-base text-[var(--muted)]">{description}</p>}
      </div>
      {children}
    </div>
  </section>
);

export default Section;
