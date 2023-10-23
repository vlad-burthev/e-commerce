import { UiButtonDanger } from "@/components/UI/Ui-button/Ui-button";
import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { useGetBrandsQuery } from "@/services/brandApi";
import { useState, useEffect, type FC, useRef } from "react";

type T_Brand = {
  id: number;
  name: string;
};

interface SelectedBrandProps {
  setDevice: any;
  device: any;
  isError?: boolean;
}

const SelectedBrand: FC<SelectedBrandProps> = ({
  setDevice,
  device,
  isError,
}) => {
  const { data: brands, isLoading } = useGetBrandsQuery("");

  const [searchBrand, setSearchBrand] = useState("");
  const [isBrandListOpen, setIsBrandListOpen] = useState(false);
  const [filteredBrand, setFilteredBrand] = useState([]);

  useEffect(() => {
    if (brands) {
      const filterBrands = brands.filter((brand: T_Brand) =>
        brand.name
          .trim()
          .toLowerCase()
          .includes(searchBrand.trim().toLowerCase())
      );
      setFilteredBrand(filterBrands);
    }
  }, [searchBrand]);

  const selectBrandHandler = (id: number, brandName: string) => {
    setDevice({ ...device, brandId: id });
    setSearchBrand(brandName);
    setIsBrandListOpen(false);
  };

  const listRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setIsBrandListOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={listRef} className="relative w-max">
      <label htmlFor="brand">Бренд</label>
      <UiInputPrimary
        value={searchBrand}
        onFocus={() => setIsBrandListOpen(true)}
        onChange={(e) => setSearchBrand(e.target.value)}
        className={isError ? "border-2 border-red-600" : ""}
        id="brand"
        placeholder="Назва бренду"
        type="text"
      />
      {isBrandListOpen && (
        <div className="absolute z-20 border-2 overflow-y-auto h-50 border-green-600 bg-green-200 w-full rounded-md ">
          {!isLoading && filteredBrand.length === 0
            ? brands.map((brand: T_Brand) => (
                <p
                  onClick={() => selectBrandHandler(brand.id, brand.name)}
                  className="p-2 cursor-pointer duration-200 hover-bg-white"
                  key={brand.id}
                >
                  {brand.name}
                </p>
              ))
            : filteredBrand.map((brand: T_Brand) => (
                <p
                  onClick={() => selectBrandHandler(brand.id, brand.name)}
                  className="p-2 cursor-pointer duration-200 hover-bg-white"
                  key={brand.id}
                >
                  {brand.name}
                </p>
              ))}
        </div>
      )}
    </div>
  );
};

export default SelectedBrand;
