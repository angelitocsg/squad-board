import { ChangeEventHandler } from "react";

type IFormInputRightButton = {
  rightButton?: {
    id: string;
    label: string;
    onClick: () => void;
  };
};

interface IFormInput extends IFormInputRightButton {
  label: string;
  field: string;
  type: "text" | "textarea" | "date";
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onTextAreaChange?: ChangeEventHandler<HTMLTextAreaElement>;
}
const FormInput = ({
  label,
  field,
  type,
  value,
  defaultValue,
  disabled,
  readOnly,
  placeholder,
  rightButton,
  rows,
  onChange,
  onTextAreaChange,
}: IFormInput) => (
  <div className="mb-3">
    <label htmlFor={field} className="form-label">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        className="form-control"
        id={field}
        name={field}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={rows}
        onChange={onTextAreaChange}></textarea>
    ) : (
      <div className="input-group">
        <input
          className="form-control"
          id={field}
          name={field}
          type={type}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange}
        />
        {rightButton && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            id={rightButton.id}
            onClick={rightButton.onClick}>
            {rightButton.label}
          </button>
        )}
      </div>
    )}
  </div>
);

export default FormInput;
