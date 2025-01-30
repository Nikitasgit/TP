import { ButtonHTMLAttributes } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  customColor?: "red" | "blue";
  label: string;
  disabled?: boolean;
}
