import { Controller, Control, FieldValues } from "react-hook-form";

export interface InputControlledProps extends FieldValues {
  style: string;
  label: string;
  name: string;
  control?: Control<any>;
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
    <div className="mb-4 w-full">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { onChange, value, onBlur, ref },
          fieldState: { error },
        }) => (
          <>
            <input
              name={name}
              placeholder={label}
              className={style}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              ref={ref}
              {...rest}
            />
            {!!error ? (
              <p className="text-red-600 text-xs mt-2">{error?.message}</p>
            ) : null}
          </>
        )}
      />
    </div>
  );
};

export default Input;
