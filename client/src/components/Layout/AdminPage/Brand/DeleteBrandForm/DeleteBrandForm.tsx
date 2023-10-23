import { UiButtonDanger } from "@/components/UI/Ui-button/Ui-button";
import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { useDeleteBrandMutation } from "@/services/brandApi";
import { useState, type FC } from "react";

interface DeleteBrandFormProps {}

const DeleteBrandForm: FC<DeleteBrandFormProps> = () => {
  const [deleteDevice, { isError }] = useDeleteBrandMutation();
  const [id, setId] = useState("");
  const [res, setRes] = useState({});

  const deleteDeviceHandler = async (e) => {
    e.preventDefault();

    const res = await deleteDevice({ id });
    setRes(res);

    if (isError === false) {
      setId("");
    }
  };

  return (
    <form
      onSubmit={deleteDeviceHandler}
      className={`flex flex-col rounded-md align-center justify-center w-1/3 border-2 rounded-m ${
        isError ? "border-red-600 bg-red-50" : "border-green-600 bg-green-50"
      }  p-4`}
    >
      <label htmlFor="brand">ID бренду</label>
      <UiInputPrimary
        className={`${isError ? "border-red-600" : ""}`}
        value={id}
        type="number"
        onChange={(e) => {
          setId(e.target.value);
        }}
        id="brand"
        placeholder="Введіть ID бренду"
      />

      {isError ? (
        <span className="font-bold text-red-600">
          {res?.error?.data?.message}
        </span>
      ) : (
        <span className="font-bold text-green-600">{res?.data}</span>
      )}
      <UiButtonDanger className="mt-4" type="submit">
        Видалити бренд
      </UiButtonDanger>
    </form>
  );
};

export default DeleteBrandForm;
