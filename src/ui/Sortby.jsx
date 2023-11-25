import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function Sortby({ options }) {
  const [selectValue, setSelectValue] = useSearchParams();
  const handleSelectOption = function (e) {
    selectValue.set("sortBy", e.target.value);
    setSelectValue(selectValue);
  };

  const sortBy = selectValue.get("sortBy") || "";
  return (
    <Select
      options={options}
      $type={"white"}
      onhandleSelectOption={handleSelectOption}
      value={sortBy}
    />
  );
}

export default Sortby;
