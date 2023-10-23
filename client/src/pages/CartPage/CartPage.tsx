import { useAuthRedirect } from "@/helpers/hooks/useAuthRedirect";
import type { FC } from "react";

interface CartPageProps {}

const CartPage: FC<CartPageProps> = () => {
  useAuthRedirect();
  return <h1>CartPage</h1>;
};

export default CartPage;
