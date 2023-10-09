import { ChangeEventHandler, useEffect, useRef, useState } from "react";

import { ISelectOptions } from "../SelectInput";

type IProps = {
  label: string;
  field: string;
  value?: ISelectOptions;
  defaultValue?: ISelectOptions;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  options: ISelectOptions[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const FormInputFilter = ({
  label,
  field,
  value,
  defaultValue,
  disabled,
  readOnly,
  placeholder,
  options,
  onChange,
}: IProps) => {
  const inputForFilter = useRef<any>();
  const inputForValue = useRef<any>();
  const [open, setOpen] = useState(false);
  const [forFilter, setForFilter] = useState(value?.label ?? "");
  const [position, setPosition] = useState({ top: 0, left: 0, minWidth: 100 });
  const [filtered, setFiltered] = useState(options);

  const founded = () => {
    return (
      filtered.length === 1 &&
      filtered[0].label.toLowerCase() === inputForFilter.current.value.toLowerCase()
    );
  };

  const handleChange = (e: any) => {
    setForFilter(e.target.value);
    const target = { name: field, value: "" };
    onChange && onChange({ target } as any);
  };

  useEffect(() => {
    setOpen(false);
    if (founded()) return;
    if ((forFilter.toString().length ?? 0) === 0) return;
    const currPos = inputForFilter.current.getBoundingClientRect();
    setPosition({ top: currPos.top + 38, left: currPos.left, minWidth: currPos.width });
    setOpen(true);
    const _forFilter = forFilter.toString().toLowerCase();
    const _label = (opt: any) => opt.label.toLowerCase().indexOf(_forFilter) !== -1;
    const _value = (opt: any) => opt.value.toLowerCase().indexOf(_forFilter) !== -1;
    setFiltered(options.filter(opt => _label(opt) || _value(opt)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forFilter, options]);

  useEffect(() => {
    if (!founded()) return;
    setOpen(false);
    inputForValue.current.value = filtered[0].value;
    const target = { name: field, value: filtered[0].value };
    onChange && onChange({ target } as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, forFilter]);

  useEffect(() => {
    setForFilter(value?.label ?? "");
  }, [value]);

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <input
        ref={inputForFilter}
        className="form-control mb-1"
        value={forFilter}
        defaultValue={defaultValue?.label}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        ref={inputForValue}
        className="form-control mb-1"
        style={{ display: "none" }}
        id={field}
        name={field}
        value={value?.value}
        defaultValue={defaultValue?.value}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
      />
      <div
        className="list-group shadow"
        style={{
          display: open ? "block" : "none",
          position: "fixed",
          zIndex: 1000,
          ...position,
        }}>
        {filtered
          .filter(opt => opt.label)
          .map((opt, i) => (
            <button
              key={i}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => handleChange({ target: { name: field, value: opt.label } })}>
              {opt.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default FormInputFilter;
