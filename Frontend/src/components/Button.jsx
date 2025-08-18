import React from "react";

const Button = React.memo(
  ({ children, variant, size, color = "primary", className, ...rest }) => {
    const sizes = {
      small: "",
      large: "",
      medium: "",
    };

    const colors = {
      accent: "",
      error: "bg-error",
      primary: "primary",
      warning: "bg-warning",
      success: "bg-success",
    };

    const variants = {
      icon: "",
      outlined: "",
      contained: "",
    };

    const baseClasses = "button";
    const sizeClasses = sizes[size] ?? "";
    const colorClasses = colors[color] ?? "";
    const variantClasses = variants[variant] ?? "";

    const classConfig = [
      baseClasses,
      sizeClasses,
      colorClasses,
      variantClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    console.log(classConfig);

    // endIcon , startIcon : props
    // <IconButton /> button with icon and text

    // const config = React.useMemo(() => `button ${sizes[size]}`, [size]);
    return (
      <button {...rest} className={`${classConfig}`}>
        {children && children}
      </button>
    );
  }
);

export default Button;
