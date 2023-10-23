import { UiButtonPrimary } from "@/components/UI/Ui-button/Ui-button";
import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { useAddBrandMutation } from "@/services/brandApi";
import { useState, type FC } from "react";

interface AddBrandFormProps {}

const AddBrandForm: FC<AddBrandFormProps> = () => {
  const [addDevice, { isError, isLoading }] = useAddBrandMutation();
  const [name, setName] = useState("");
  const [res, setRes] = useState({});

  const addDeviceHandler = async (e) => {
    e.preventDefault();

    const res = await addDevice({ name });
    setRes(res);
  };

  return (
    <form
      onSubmit={addDeviceHandler}
      className={`flex flex-col rounded-md align-center justify-center w-1/3 border-2 rounded-m ${
        isError ? "border-red-600 bg-red-50" : "border-green-600 bg-green-50"
      }  p-4`}
    >
      <label htmlFor="brand">Назва бренду</label>
      <UiInputPrimary
        className={`${isError ? "border-red-600" : ""}`}
        value={name}
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        id="brand"
        placeholder="Введіть назву бренду"
      />

      {isError && (
        <span className="font-bold text-red-600">
          {res?.error?.data?.message}
        </span>
      )}
      <UiButtonPrimary className="mt-4" type="submit">
        Додати бренд
      </UiButtonPrimary>
    </form>
  );
};

export default AddBrandForm;
