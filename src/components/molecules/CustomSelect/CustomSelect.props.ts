interface IOption {
  value: string | number;
  display: string;
}
export interface ICustomSelectProps {
  options: IOption[];
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
