import { ChangeEventHandler } from "react";
import { TBadge } from "../DisplayTable/BadgeType";

export type ISelectOptions = {
  value: any;
  label: string;
  color?: TBadge;
};

interface ISelectInput {
  variation?: "default" | "checkbox";
  label: string;
  field: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  placeholder?: string;
  options: ISelectOptions[];
  multiple?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}
const SelectInput = (props: ISelectInput) =>
  props.variation === "checkbox" ? (
    <SelectInputCheckbox {...props} />
  ) : (
    <SelectInputDefault {...props} />
  );

const SelectInputDefault = ({
  label,
  field,
  value,
  defaultValue,
  disabled,
  placeholder,
  options,
  multiple,
  onChange,
}: ISelectInput) => (
  <div className="mb-3">
    <label htmlFor={field} className="form-label">
      {label}
    </label>
    <select
      className="form-select"
      multiple={multiple}
      id={field}
      name={field}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      title={`campo: ${field}`}>
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const Checkbox = ({
  field,
  label,
  value,
  color,
  checked,
  idx,
  onChange,
}: any) => (
  <>
    <input
      key={`${field}${idx}`}
      type="radio"
      className="btn-check"
      name={field}
      id={`${field}${idx}`}
      value={value}
      autoComplete="off"
      checked={checked}
      onChange={onChange}
    />
    <label
      className={`btn btn-outline-${
        color ? color : "primary"
      } text-dark border`}
      htmlFor={`${field}${idx}`}>
      {label}
    </label>
  </>
);

const SelectInputCheckbox = ({
  label,
  field,
  value,
  defaultValue,
  disabled,
  options,
  onChange,
}: ISelectInput) => (
  <div className="mb-3">
    <label htmlFor={field} className="form-label">
      {label}
    </label>
    <div className="btn-group-vertical btn-group-sm d-grid gap-0" role="group">
      {options.map((st, idx) => (
        <Checkbox
          key={idx}
          field={field}
          label={st.label}
          value={st.value}
          color={st.color}
          checked={st.value === value}
          idx={idx}
          onChange={onChange}
        />
      ))}
    </div>

    {/* <select
      className="form-select"
      multiple={multiple}
      id={field}
      name={field}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      title={`campo: ${field}`}>
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select> */}
  </div>
);

export default SelectInput;
