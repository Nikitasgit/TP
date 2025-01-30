import { ICustomSelectProps } from "./CustomSelect.props";
import "./CustomSelect.scss";
const CustomSelect: React.FC<ICustomSelectProps> = ({
  options,
  onChange,
  label,
}) => {
  return (
    <label>
      {label}
      <select className="customSelect" onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.display}
          </option>
        ))}
      </select>
    </label>
  );
};

export default CustomSelect;
