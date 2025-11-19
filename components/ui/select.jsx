import clsx from 'clsx';

export default function Select({ className, children, ...props }) {
  return (
    <select
      className={clsx(
        'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
