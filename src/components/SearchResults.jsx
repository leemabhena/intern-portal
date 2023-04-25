import "./SearchResults.css";
import { useState } from "react";

const SearchResults = ({ setLayout, data, setData, search }) => {
  const [sortBy, setSortBy] = useState("");

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    if (event.target.value == "upvotes") {
      const sortedData = [...data].sort((a, b) => b.upvote - a.upvote);
      setData(sortedData);
    } else if (event.target.value == "created_at") {
      const sortedData = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      console.log(sortedData);
      setData(sortedData);
    }
  };

  return (
    <div className="SearchResults">
      <div className="results-title">
        <h5 className="show-result-t">Showing result: {data?.length}</h5>
        <p>
          {search.search}
          {search.location && ` | ${search.location}`}
        </p>
      </div>
      <div
        className="results-sq"
        onClick={() => {
          setLayout("rectangle");
        }}
      >
        <i class="fa-solid fa-list"></i>
      </div>
      <div
        className="results-sq"
        onClick={() => {
          setLayout("square");
        }}
      >
        <i class="fa-solid fa-table-cells"></i>
      </div>
      <div className="results-rec">
        <i class="fa-solid fa-sort"></i>
        <select
          name="sort"
          id="sort"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="none">None</option>
          <option value="upvotes">Upvotes</option>
          <option value="created_at">Created At</option>
        </select>
      </div>
    </div>
  );
};

export default SearchResults;
