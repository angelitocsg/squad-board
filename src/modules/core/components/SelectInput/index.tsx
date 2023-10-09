import { ChangeEventHandler } from "react";

export type ISelectOptions = {
  value: any;
  label: string;
};

interface ISelectInput {
  label: string;
  field: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  placeholder?: string;
  options: ISelectOptions[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}
const SelectInput = ({
  label,
  field,
  value,
  defaultValue,
  disabled,
  placeholder,
  options,
  onChange,
}: ISelectInput) => (
  <div className="mb-3">
    <label htmlFor={field} className="form-label">
      {label}
    </label>
    <select
      className="form-select"
      id={field}
      name={field}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
