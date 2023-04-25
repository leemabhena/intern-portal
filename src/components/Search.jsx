import "./Search.css";
import { useState, useEffect } from "react";

export default function Search({ setSearch, data, setData, supabase }) {
  const [query, setQuery] = useState({ search: "", location: "" });

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    setQuery({ ...query, [event.target.name]: inputValue });
    setSearch({ ...query, [event.target.name]: inputValue });
    // if (!query.location.trim() && !query.search.trim()) {
    //   window.location.reload();
    // }
  };

  const handleSearchClick = () => {
    let filteredData = [...data];
    if (query.search) {
      filteredData = filteredData.filter((item) =>
        item.job_title.toLowerCase().includes(query.search.toLowerCase().trim())
      );
    }
    if (query.location) {
      filteredData = filteredData.filter((item) =>
        item.location
          .toLowerCase()
          .includes(query.location.toLowerCase().trim())
      );
    }

    setData(filteredData);
  };

  return (
    <div className="Search">
      <div className="search-container">
        <div className="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Frontend Web Developer"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="location-container">
        <div className="search-bar">
          <i class="fa-solid fa-location-dot"></i>
          <input
            type="search"
            name="location"
            id="location"
            placeholder="Williamstown"
            onChange={handleSearch}
          />
        </div>
      </div>
      <button className="search-btn" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}
