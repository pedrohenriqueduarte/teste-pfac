import { Controller, Control, FieldValues } from "react-hook-form";

export interface InputControlledProps extends FieldValues {
  style: string;
  label: string;
  name: string;
  control: Control;
  defaultValue?: any;
}

const Input = ({
  style,
  label,
  name,
  control,
  defaultValue = "",
  ...rest
}: InputControlledProps) => {
  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { onChange, value, onBlur, ref },
          fieldState: { error },
        }) => (
          <input
            placeholder={label}
            className={style}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            ref={ref}
            {...rest}
          />
        )}
      />
    </div>
  );
};

export default Input;
