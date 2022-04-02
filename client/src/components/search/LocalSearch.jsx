import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div class="input-group mb-5">
      <input type="search" value={keyword} onChange={handleSearchChange} className="form-control" placeholder="Search" />
      <div class="input-group-text btn btn-primary">
        <i class="fe fe-search" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default LocalSearch;
