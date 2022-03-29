import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    // className="h-100 d-flex justify-content-center align-items-center"
    <form className="input-group d-flex w-50 float-start" onSubmit={handleSubmit}>
      <input onChange={handleChange} value={text} type="text" className="form-control border-end-0 my-2" placeholder="Search..." />
      <button className="btn input-group-text bg-transparent border-start-0 text-muted my-2">
        <i className="fe fe-search" onClick={handleSubmit} style={{ cursor: "pointer" }}></i>
      </button>
    </form>
  );
};

export default Search;
