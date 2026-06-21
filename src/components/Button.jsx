import { forwardRef } from 'react';

const variantClass = {
  primary: 'ui-btn ui-btn-primary',
  secondary: 'ui-btn ui-btn-secondary',
  ghost: 'ui-btn ui-btn-ghost',
  link: 'ui-btn ui-btn-link',
};

const sizeStyle = {
  sm: { padding: '0.5rem 0.9rem', fontSize: '0.8125rem', minHeight: '2.125rem' },
  md: null,
  lg: { padding: '0.9rem 1.5rem', fontSize: '1rem', minHeight: '2.875rem' },
};

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className = '', style, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${variantClass[variant] || variantClass.primary} ${className}`}
      style={{ ...sizeStyle[size], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
