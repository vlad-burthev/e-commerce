import {
  UiButtonDanger,
  UiButtonPrimary,
} from "@/components/UI/Ui-button/Ui-button";
import { useState, type FC } from "react";
import DeviceFormAdd from "./AddDeviceForm/DeviceFormAdd";
import DeleteDeviceForm from "./DeleteDeviceFrom/DeleteDeviceForm";

interface DeviceControllerProps {}

const DeviceController: FC<DeviceControllerProps> = () => {
  const [isControllerVisible, setIsControllerVisible] = useState(true);

  return (
    <div>
      <div className="flex">
        <UiButtonPrimary
          className="mr-8"
          onClick={() => setIsControllerVisible(true)}
        >
          Додати девайс
        </UiButtonPrimary>
        <UiButtonDanger onClick={() => setIsControllerVisible(false)}>
          Видалити девайс
        </UiButtonDanger>
      </div>
      <div className="mt-4">
        {isControllerVisible ? <DeviceFormAdd /> : <DeleteDeviceForm />}
      </div>
    </div>
  );
};

export default DeviceController;
