import React from "react";
import { motion } from "framer-motion";

const Button = React.memo(
  ({ children, variant, color, className, ...rest }) => {
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

    const classConfig = [
      "btn",
      variants[variant] ?? variants.icon,
      colors[color] ?? "",
      className ?? "",
    ]
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
