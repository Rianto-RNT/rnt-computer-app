import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className="input-group mb-5">
      <input type="search" value={keyword} onChange={handleSearchChange} className="form-control" placeholder="Search" />
      <div className="input-group-text btn btn-primary">
        <i className="fe fe-search" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default LocalSearch;
