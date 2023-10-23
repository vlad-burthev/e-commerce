import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { useState, type FC } from "react";
import SelectedBrand from "./SelectedBrand";
import SelectedType from "./SelectedType";
import DeviceAddInfo from "./DeviceAddInfo";
import DeviceAddImage from "./DeviceAddImage";
import { UiButtonSecondary } from "@/components/UI/Ui-button/Ui-button";
import { useCreateDeviceMutation } from "@/services/deviceApi";

export type T_Device = {
  name: string;
  price: number;
  img: string | null;
  info: any[];
  brandId: number;
  typeId: number;
};

interface DeviceFormAddProps {}

const DeviceFormAdd: FC<DeviceFormAddProps> = () => {
  const [device, setDevice] = useState<T_Device>({
    name: "",
    price: 0,
    img: null,
    info: [],
    brandId: 0,
    typeId: 0,
  });

  const [createDevice, { isError }] = useCreateDeviceMutation();

  const createDeviceHandler = async () => {
    const formData = new FormData();
    formData.append("name", device.name);
    formData.append("price", device.price.toString());
    formData.append("img", device.img);
    formData.append("brandId", device.brandId.toString());
    formData.append("typeId", device.typeId.toString());
    formData.append("info", JSON.stringify(device.info));

    const res = await createDevice(formData);
    if (res?.data) {
      location.reload();
    }
  };

  return (
    <div>
      <form
        className={`w-3/5 border-2 rounded-md ${
          isError ? "border-red-600 bg-red-50" : "border-green-600 bg-green-50"
        }  p-4`}
      >
        <div className="flex justify-between">
          <div>
            <label htmlFor="name">Назва</label>
            <UiInputPrimary
              className={isError ? "border-2 border-red-600" : ""}
              value={device.name}
              onChange={(e) => setDevice({ ...device, name: e.target.value })}
              type="text"
              id="name"
              placeholder="Назва девайсу"
            />
          </div>

          <div>
            <label htmlFor="price">Ціна</label>
            <UiInputPrimary
              className={isError ? "border-2 border-red-600" : ""}
              value={device.price}
              onChange={(e) =>
                setDevice({ ...device, price: parseFloat(e.target.value) || 0 })
              }
              type="number"
              id="price"
              placeholder="Ціна девайсу"
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <SelectedBrand
            isError={isError}
            setDevice={setDevice}
            device={device}
          />
          <SelectedType
            isError={isError}
            setDevice={setDevice}
            device={device}
          />
        </div>

        <DeviceAddImage
          isError={isError}
          setDevice={setDevice}
          device={device}
        />

        <area />

        <DeviceAddInfo setDevice={setDevice} device={device} />

        <UiButtonSecondary
          type="button"
          onClick={createDeviceHandler}
          className={`mt-10 ${isError ? "border-2 border-red-600" : ""}`}
        >
          Створити девайс
        </UiButtonSecondary>
      </form>
    </div>
  );
};

export default DeviceFormAdd;
