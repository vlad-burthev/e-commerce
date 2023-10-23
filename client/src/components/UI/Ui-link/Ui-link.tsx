import { type FC } from "react";
import { Link } from "react-router-dom";

interface PropsUiLink {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const UiLinkPrimary: FC<PropsUiLink> = ({ to, children, className }) => {
  return (
    <Link
      className={`block bg-green-600 px-3 py-1.5 rounded-md text-white ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
};

export const UiLinkSecondary: FC<PropsUiLink> = ({
  to,
  children,
  className,
}) => {
  return (
    <Link
      className={`block bg-amber-500 px-3 py-1.5 rounded-md text-white ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
};
