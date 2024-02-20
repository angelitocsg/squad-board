import { ChangeEventHandler } from "react";

type IProps = {
  label: string;
  field: string;
  value?: boolean;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const FormCheckBox = ({ label, field, value, className, onChange }: IProps) => {
  const handleChange = (e: any) => {
    const target = { name: field, value: e.target.checked };
    onChange && onChange({ target } as any);
  };

  return (
    <div className={`form-check ${className}`}>
      <input
        type="checkbox"
        className="form-check-input"
        id={field}
        name={field}
        checked={value ?? false}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={field}>
        {label}
      </label>
    </div>
  );
};

export default FormCheckBox;
