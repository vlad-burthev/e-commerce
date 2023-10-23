import { UiButtonDanger } from "@/components/UI/Ui-button/Ui-button";
import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { useUseGetTypesQuery } from "@/services/typeApi";
import { useState, useEffect, type FC, useRef } from "react";

type T_Type = {
  id: number;
  name: string;
};

interface SelectedTypeProps {
  setDevice: any;
  device: any;
  isError?: boolean;
}

const SelectedType: FC<SelectedTypeProps> = ({
  setDevice,
  device,
  isError,
}) => {
  const { data: types, isLoading } = useUseGetTypesQuery("");

  const [searchType, setSearchType] = useState("");
  const [isTypeListOpen, setIsTypeListOpen] = useState(false);
  const [filteredType, setFilteredType] = useState([]);

  useEffect(() => {
    if (types) {
      const filterTypes = types.filter((type: T_Type) =>
        type.name.trim().toLowerCase().includes(searchType.trim().toLowerCase())
      );
      setFilteredType(filterTypes);
    }
  }, [searchType]);

  const selectTypeHandler = (id: number, typeName: string) => {
    setDevice({ ...device, typeId: id });
    setSearchType(typeName);
    setIsTypeListOpen(false);
  };

  const listRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setIsTypeListOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={listRef} className="relative w-max">
      <label htmlFor="type">Тип</label>
      <UiInputPrimary
        className={isError ? "border-2 border-red-600" : ""}
        value={searchType}
        onFocus={() => setIsTypeListOpen(true)}
        onChange={(e) => setSearchType(e.target.value)}
        id="type"
        placeholder="Назва типу"
        type="text"
      />
      {isTypeListOpen && (
        <div className="absolute overflow-x-hidden z-20 border-2 overflow-y-auto h-50 border-green-600 bg-green-200 w-full rounded-md ">
          {!isLoading && filteredType.length === 0
            ? types.map((type: T_Type) => (
                <p
                  onClick={() => selectTypeHandler(type.id, type.name)}
                  className="p-2 cursor-pointer duration-200 hover-bg-white"
                  key={type.id}
                >
                  {type.name}
                </p>
              ))
            : filteredType.map((type: T_Type) => (
                <p
                  onClick={() => selectTypeHandler(type.id, type.name)}
                  className="p-2 cursor-pointer duration-200 hover-bg-white"
                  key={type.id}
                >
                  {type.name}
                </p>
              ))}
        </div>
      )}
    </div>
  );
};

export default SelectedType;
