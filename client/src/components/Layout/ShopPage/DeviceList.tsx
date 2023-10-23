import { useGetAllDevicesQuery } from "@/services/deviceApi";
import type { FC } from "react";
import DeviceItem from "./DeviceItem";

interface DeviceListProps {}

export type T_Device = {
  id: number;
  slug: string;
  name: string;
  price: number;
  discount: number;
  img: string;
  brandId: number;
  typeId: number;
  ratings: [];
};

const DeviceList: FC<DeviceListProps> = () => {
  const { data, isError, isLoading } = useGetAllDevicesQuery("");

  if (isError || isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {data?.rows.map((device: T_Device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </div>
  );
};

export default DeviceList;
