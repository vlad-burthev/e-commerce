import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { type FC } from "react";

interface DeviceAddImageProps {
  setDevice: any;
  device: any;
  isError: boolean;
}

const DeviceAddImage: FC<DeviceAddImageProps> = ({
  setDevice,
  device,
  isError,
}) => {
  const selectFileHandler = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setDevice({ ...device, img: selectedFile });
    }
  };

  return (
    <div className="mt-10">
      <UiInputPrimary
        className={`cursor-pointer w-full ${
          isError ? "border-2 border-red-600" : ""
        }`}
        onChange={selectFileHandler}
        type="file"
      />
    </div>
  );
};

export default DeviceAddImage;
