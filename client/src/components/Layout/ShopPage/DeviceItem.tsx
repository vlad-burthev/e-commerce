import type { FC } from "react";
import { T_Device } from "./DeviceList";
import DeviceRate from "./DeviceRate";
import { UiButtonPrimary } from "@/components/UI/Ui-button/Ui-button";
import { DEVICE_PAGE_ROUTE } from "@/utils/constants/constants";
import { Link } from "react-router-dom";

interface DeviceItemProps {
  device: T_Device;
}

const DeviceItem: FC<DeviceItemProps> = ({ device }) => {
  return (
    <Link
      to={DEVICE_PAGE_ROUTE + "/" + device.slug}
      className="border-2 rounded duration-200  hover:shadow-xl hover:shadow-green-900/60"
    >
      <img
        className="aspect-[3/4] object-fill"
        src={import.meta.env.VITE_BASE_URL + device.img}
        alt={device.name}
      />
      <div className="p-2">
        <p>
          Ціна: <span className="font-bold text-lg ">{device.price}₴</span>
        </p>
        <h3>
          Назва :<span className="font-bold text-lg"> {device.name}</span>
        </h3>

        <UiButtonPrimary
          onClick={(e: any) => e.preventDefault()}
          className="w-full duration-200 hover:bg-orange-600  "
        >
          В корзину
        </UiButtonPrimary>
      </div>
    </Link>
  );
};

export default DeviceItem;
