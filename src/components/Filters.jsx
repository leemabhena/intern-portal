import CheckBoxes from "./CheckBoxes";
import "./Filters.css";
import { useState } from "react";

export default function Filters({ data, setData, supabase }) {
  const [filters_applied, setFiltersApplied] = useState([]);

  return (
    <div className="Filters">
      <div className="filters-top">
        <h6 className="filter-h">Filters</h6>
        <h6
          className="clear-filters"
          onClick={() => {
            window.location.reload();
          }}
        >
          Clear All
        </h6>
      </div>
      <div className="filters">
        <CheckBoxes
          type={["None", "Freshman", "Sophomore", "Junior", "Senior"]}
          title="Experience Level"
          formatted_type="level"
          data={data}
          setData={setData}
          filters_applied={filters_applied}
          setFiltersApplied={setFiltersApplied}
          supabase={supabase}
        />
        <CheckBoxes
          type={["Remote", "Onsite", "Hybrid"]}
          title="Work Styles"
          formatted_type="work_style"
          data={data}
          setData={setData}
          filters_applied={filters_applied}
          setFiltersApplied={setFiltersApplied}
          supabase={supabase}
        />

        <CheckBoxes
          type={["Paid", "Unpaid"]}
          title="Pay"
          data={data}
          formatted_type="pay"
          setData={setData}
          filters_applied={filters_applied}
          setFiltersApplied={setFiltersApplied}
          supabase={supabase}
        />
      </div>
    </div>
  );
}
