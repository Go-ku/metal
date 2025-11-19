import clsx from 'clsx';

export function Card({ children, className }) {
  return <div className={clsx('rounded-2xl bg-white p-5 shadow-soft', className)}>{children}</div>;
}

export function CardHeader({ children, className }) {
  return <div className={clsx('mb-3 flex items-center justify-between gap-2', className)}>{children}</div>;
}

export function CardTitle({ children, className }) {
  return <h3 className={clsx('text-lg font-semibold text-slate-900', className)}>{children}</h3>;
}

export function CardDescription({ children, className }) {
  return <p className={clsx('text-sm text-slate-500', className)}>{children}</p>;
}
