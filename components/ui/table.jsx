import clsx from 'clsx';

export function Table({ children, className }) {
  return <div className={clsx('overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm', className)}>{children}</div>;
}

export function THead({ children }) {
  return <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">{children}</div>;
}

export function TRow({ children, className }) {
  return (
    <div className={clsx('grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] border-t border-slate-100 px-4 py-3 text-sm text-slate-700', className)}>
      {children}
    </div>
  );
}
