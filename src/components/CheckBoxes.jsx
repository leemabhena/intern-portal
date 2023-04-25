import "./CheckBoxes.css";
import { useState } from "react";

const CheckBoxes = ({
  type,
  title,
  data,
  setData,
  formatted_type,
  supabase,
  filters_applied,
  setFiltersApplied,
}) => {
  const initial = {};

  for (const item of type) {
    if (item.toLowerCase() == "none") {
      initial["none"] = true;
    } else {
      initial[item.toLowerCase()] = false;
    }
  }

  const [filter, setFilter] = useState(initial);

  const handleCheckboxChange = async (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      // add the filter
      const type_filter = event.target.dataset.id;
      const filteredArr = data.filter((item) => {
        return item[type_filter] == event.target.id;
      });
      setData(filteredArr);
      setFiltersApplied([...filters_applied, [type_filter, event.target.id]]);
    } else {
      // remove the filter
      if (event.target.id == "None") {
        return;
      }
      // remove the current element from filters applied
      const rem_filters = filters_applied.filter((item) => {
        return item[0] != event.target.dataset.id && item[1] != event.target.id;
      });

      setFiltersApplied(rem_filters);

      let { data: filteredArr, error } = await supabase.from("posts").select();
      if (filters_applied.length > 1) {
        for (const item of rem_filters) {
          filteredArr = filteredArr.filter((data_item) => {
            return data_item[item[0]] == item[1];
          });
        }
        setData(filteredArr);
      }
      setData(filteredArr);
    }
  };
  return (
    <div className="CheckBoxes">
      <h4>{title}</h4>
      {type.map((item, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              name={item.toLowerCase()}
              id={item}
              checked={filter[item.toLowerCase()]}
              onChange={handleCheckboxChange}
              data-id={formatted_type}
            />{" "}
            <label htmlFor={item}>{item}</label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckBoxes;
