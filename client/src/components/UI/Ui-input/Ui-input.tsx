import type { FC } from "react";

interface UiInputProps {
  className?: string;
  type: "text" | "number" | "file" | "email" | "password";
  placeholder?: string;
  id?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
}

export const UiInputPrimary: FC<UiInputProps> = ({
  className,
  type,
  placeholder,
  id,
  value,
  onChange,
  onFocus,
  ...props
}) => {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      id={id}
      type={type}
      className={`block py-1  border-2 border-green-400 duration-200 rounded-md pl-2 outline-green-600 px-2 ${className}`}
      placeholder={placeholder}
    />
  );
};

export const UiInputDanger: FC<UiInputProps> = ({
  className,
  type,
  placeholder,
  id,
  value,
  onChange,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      id={id}
      type={type}
      className={`block py-1  border-2 border-red-400 duration-200 rounded-md pl-2 outline-red-600 px-2 ${className}`}
      placeholder={placeholder}
    />
  );
};
