import { ChangeEvent } from "react";

export interface ITextFieldProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  name: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
}
