import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-sans font-semibold active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-brand-accent text-white hover:bg-brand-accent-hover hover:shadow-[0_0_20px_rgba(232,93,58,0.3)]",
    secondary: "bg-brand-purple text-white hover:bg-brand-purple-mid",
    outline: "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
    text: "bg-transparent text-white/50 hover:text-white",
  };

  const defaultSizes = className.includes('h-') ? '' : 'px-6 py-3 rounded-full text-sm';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${defaultSizes} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
