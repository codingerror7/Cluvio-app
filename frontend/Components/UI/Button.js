import React from "react";

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

const sizeClass = {
  sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
  md: "h-9 px-4 text-sm rounded-[var(--radius-sm)]",
  lg: "h-11 px-6 text-sm font-medium rounded-[var(--radius-md)]",
  icon: "h-9 w-9 p-0 flex items-center justify-center btn-icon rounded-[var(--radius-sm)]",
};

const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  loading = false,
  as: Component = "button",
  ...props
}) => {
  return (
    <Component
      className={`btn ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </Component>
  );
};

export default Button;
