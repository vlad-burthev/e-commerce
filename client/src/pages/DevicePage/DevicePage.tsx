import DeviceRate from "@/components/Layout/ShopPage/DeviceRate";
import {
  UiButtonDanger,
  UiButtonPrimary,
} from "@/components/UI/Ui-button/Ui-button";
import { useGetDeviceBySlugQuery } from "@/services/deviceApi";
import type { FC } from "react";
import { useParams } from "react-router-dom";

interface DevicePageProps {}

const DevicePage: FC<DevicePageProps> = () => {
  const { slug } = useParams();
  const { data: device, isLoading } = useGetDeviceBySlugQuery(slug);

  if (isLoading || !device) return "Loading...";

  return (
    <div className="py-20">
      <div className="flex justify-between ">
        <div className="w-2/4">
          <img
            src={import.meta.env.VITE_BASE_URL + device.img}
            alt={device.name}
          />
        </div>
        <div className="w-2/4">
          <h2 className="text-4xl font-bold">{device.name}</h2>
          <p className="text-2xl font-bold">
            Ціна:
            <span className="text-3xl ml-2 text-red-600">{device.price} ₴</span>
          </p>
          <div>
            <UiButtonPrimary>У кошик</UiButtonPrimary>
            <UiButtonDanger className="ml-10">Купити</UiButtonDanger>
          </div>

          <div>
            <DeviceRate deviceId={device.id} deviceRate={device.ratings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
