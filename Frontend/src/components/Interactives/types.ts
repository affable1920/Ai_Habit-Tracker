import type { FieldErrors, UseFormRegister } from "react-hook-form";

export interface ErrorMessageProps {
  error?: string;
}

export interface LabelProps {
  name: string;
  required?: boolean;
}

export interface BaseInputProps {
  name: string;
  large?: boolean;
  className?: string;
  type?: string | undefined;
  register: UseFormRegister<any>;
}

export interface InputProps {
  name: string;
  type?: string;
  large?: boolean;
  required?: boolean;
  errors?: FieldErrors<any>;
  register: UseFormRegister<any>;
}

export interface SelectProps extends InputProps {
  options: (string | number)[];
}
