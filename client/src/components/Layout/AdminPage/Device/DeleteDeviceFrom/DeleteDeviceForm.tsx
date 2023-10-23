import { UiButtonDanger } from "@/components/UI/Ui-button/Ui-button";
import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { useDeleteDeviceMutation } from "@/services/deviceApi";
import { useState, type FC } from "react";

interface DeleteDeviceFormProps {}

const DeleteDeviceForm: FC<DeleteDeviceFormProps> = () => {
  const [deleteDevice, { isError, isLoading }] = useDeleteDeviceMutation();
  const [errorInput, setErrorInput] = useState(false);
  const [slug, setSlug] = useState("");
  const [res, setRes] = useState({});

  const deleteDeviceHandler = async () => {
    if (slug.length !== 0) {
      const res = await deleteDevice(slug);
      setErrorInput(false);
      setRes(res);
      setSlug("");
    } else {
      setErrorInput(true);
    }
  };

  return (
    <div>
      <form
        className={`flex flex-col rounded-md align-center justify-center w-1/3 border-2 rounded-m ${
          isError || errorInput
            ? "border-red-600 bg-red-50"
            : "border-green-600 bg-green-50"
        }  p-4`}
      >
        <div>
          <label className="font-bold " htmlFor="name">
            Slug девайса
          </label>
          <UiInputPrimary
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            type="text"
            className={` w-full ${
              isError || errorInput ? "border-red-600 bg-red-50" : ""
            }`}
            placeholder="Введить slug девайса"
            id="name"
          />
          <span className="font-bold text-red-600">
            {errorInput && "Поле не має бути пустим"}
          </span>
        </div>

        {res?.data ? (
          <span className="font-bold text-green-600">{res.data}</span>
        ) : (
          <span className="font-bold text-red-600">
            {res?.error?.data?.message}
          </span>
        )}

        <UiButtonDanger
          type="button"
          onClick={deleteDeviceHandler}
          className="mt-10 w-full"
        >
          {isLoading ? "Видалення..." : "Видалити девайс"}
        </UiButtonDanger>
      </form>
    </div>
  );
};

export default DeleteDeviceForm;
