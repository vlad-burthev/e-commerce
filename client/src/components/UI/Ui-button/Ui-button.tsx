import { type FC } from "react";

interface UiButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const UiButtonPrimary: FC<UiButtonProps> = ({
  children,
  type = "button",
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green-600 px-3 py-1.5 rounded-md text-white ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export const UiButtonSecondary: FC<UiButtonProps> = ({
  children,
  type = "button",
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 px-3 py-1.5 rounded-md bg-emerald-600  text-white ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export const UiButtonDanger: FC<UiButtonProps> = ({
  children,
  type = "button",
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red-500 text-white px-3 py-1.5 rounded-md ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export const UiButtonWarning: FC<UiButtonProps> = ({
  children,
  type = "button",
  className,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={` ${className}`} type={type}>
      {children}
    </button>
  );
};
