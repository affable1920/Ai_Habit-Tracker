import React from "react";
import { motion } from "framer-motion";

interface BtnProps {
  color?: string;
  variant?: string;
  className?: string;
  children?: React.ReactNode;

  onClick?: (...args: any) => void;
}

const Button = React.memo(
  ({
    children,
    variant = "icon",
    color = "",
    className = "",
    ...rest
  }: BtnProps) => {
    //
    const variants = {
      icon: "btn-icon",
    };

    const colors = {
      amber: "btn-amber",
      error: "btn-error",
      accent: "btn-accent",
      warning: "btn-warning",
      success: "btn-success",
    };

    const classConfig = ["btn", variants[variant], colors[color], className]
      .filter(Boolean)
      .join(" ");

    return (
      <motion.button className={`${classConfig}`} {...rest}>
        {children && children}
      </motion.button>
    );
  }
);

export default Button;
