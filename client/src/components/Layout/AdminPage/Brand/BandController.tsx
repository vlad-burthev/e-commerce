import {
  UiButtonDanger,
  UiButtonPrimary,
} from "@/components/UI/Ui-button/Ui-button";
import { useState, type FC } from "react";
import AddBrandForm from "./AddBrandForm/AddBrandForm";
import DeleteBrandForm from "./DeleteBrandForm/DeleteBrandForm";
interface BrandControllerProps {}

const BrandController: FC<BrandControllerProps> = () => {
  const [isControllerVisible, setIsControllerVisible] = useState(true);

  return (
    <div>
      <div className="flex">
        <UiButtonPrimary
          onClick={() => setIsControllerVisible(true)}
          className="mr-8"
        >
          Додати бренд
        </UiButtonPrimary>
        <UiButtonDanger onClick={() => setIsControllerVisible(false)}>
          Видалити бренд
        </UiButtonDanger>
      </div>
      <div className="mt-4">
        {isControllerVisible ? <AddBrandForm /> : <DeleteBrandForm />}
      </div>
    </div>
  );
};

export default BrandController;
