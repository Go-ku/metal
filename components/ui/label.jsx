import clsx from 'clsx';

export default function Label({ children, className, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600', className)}
    >
      {children}
    </label>
  );
}
