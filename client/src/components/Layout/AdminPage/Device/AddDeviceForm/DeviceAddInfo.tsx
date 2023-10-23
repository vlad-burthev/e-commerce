import {
  UiButtonDanger,
  UiButtonPrimary,
} from "@/components/UI/Ui-button/Ui-button";
import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { useState, type FC, useEffect } from "react";

interface DeviceAddInfoProps {
  setDevice: any;
  device: any;
}

type T_Info = {
  title: string;
  description: string;
  num: number;
};

const DeviceAddInfo: FC<DeviceAddInfoProps> = ({ setDevice, device }) => {
  const [info, setInfo] = useState<T_Info[]>([]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", num: Date.now() }]);
  };
  const removeInfo = (num: number) => {
    setInfo(info.filter((i) => i.num !== num));
  };
  const removeAllInfo = () => {
    setInfo([]);
  };

  const changeInfo = (key: string, value: string, num: number) => {
    setInfo((prevState) =>
      prevState.map((i) => (i.num === num ? { ...i, [key]: value } : i))
    );
  };

  useEffect(() => {
    setDevice({ ...device, info: info });
  }, [info]);

  return (
    <div className="mt-10 bg-green-200 p-2 rounded-md border-2 border-green-600">
      <div className="flex justify-between">
        <UiButtonPrimary type="button" onClick={addInfo}>
          Додати властивість
        </UiButtonPrimary>

        <UiButtonDanger type="button" onClick={removeAllInfo}>
          Очистити
        </UiButtonDanger>
      </div>

      {info.map(({ title, description, num }) => (
        <div className="flex w-full justify-between mt-4" key={num}>
          <UiInputPrimary
            value={title}
            onChange={(e) => changeInfo("title", e.target.value, num)}
            type="text"
            placeholder="Назва властивості"
          />
          <UiInputPrimary
            value={description}
            onChange={(e) => changeInfo("description", e.target.value, num)}
            type="text"
            placeholder="Опис властивості"
          />

          <UiButtonDanger onClick={() => removeInfo(num)}>
            Видалити
          </UiButtonDanger>
        </div>
      ))}
    </div>
  );
};

export default DeviceAddInfo;
