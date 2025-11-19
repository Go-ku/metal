import { cva } from 'class-variance-authority';
import clsx from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white shadow-soft hover:bg-brand-700 focus-visible:ring-brand-400',
        ghost: 'bg-white text-slate-700 shadow-soft hover:text-brand-700 focus-visible:ring-brand-200',
        outline: 'border border-slate-200 bg-white text-slate-800 hover:border-brand-300 focus-visible:ring-brand-200',
      },
      size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-2',
        md: 'px-4 py-2.5',
        lg: 'px-5 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export default function Button({ className, variant, size, asChild = false, children, ...props }) {
  const Component = asChild ? 'span' : 'button';
  return (
    <Component className={clsx(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </Component>
  );
}
