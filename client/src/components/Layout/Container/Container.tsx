import type { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-screen-xl mx-auto">{children}</div>;
};

export default Container;
