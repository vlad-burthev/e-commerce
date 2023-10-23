import DeviceList from "@/components/Layout/ShopPage/DeviceList";
import type { FC } from "react";

interface ShopPageProps {}

const ShopPage: FC<ShopPageProps> = () => {
  return (
    <div className="flex w-full pt-10">
      <DeviceList />
    </div>
  );
};

export default ShopPage;
