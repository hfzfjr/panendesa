import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-[var(--radius-md)] focus:outline-none hover:-translate-y-0.5 active:scale-95 hover:shadow-md';
  
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:opacity-90',
    accent: 'bg-[var(--color-accent)] text-[var(--color-neutral-900)] hover:brightness-95',
    outline: 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
    ghost: 'bg-transparent text-[var(--color-neutral-900)] hover:bg-[var(--color-neutral-100)]',
    custom: ''
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
