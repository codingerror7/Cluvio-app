import React from "react";

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

const sizeClass = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "",
  lg: "min-h-12 px-6 py-3.5",
  icon: "btn-icon",
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
