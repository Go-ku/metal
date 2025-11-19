import clsx from 'clsx';

const intents = {
  neutral: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
  info: 'bg-blue-100 text-blue-700',
};

export default function Badge({ children, intent = 'neutral', className }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', intents[intent], className)}>
      {children}
    </span>
  );
}
