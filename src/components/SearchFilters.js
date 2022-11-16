import React, { useState, useEffect } from 'react';

function Filters(props) {
  const [keyword, updateKeyword] = useState('');
  const [filter, changeFilterType] = useState(1);

  const [setKeyword, setUpdateKeyword] = useState('');

  useEffect(() => {
    props.onChange({
      filter,
      keyword,
    });
  }, [filter, keyword]);

  const Search = (event) => {
    event.preventDefault();
    updateKeyword(setKeyword);
  };

  return (
    <div id="filter-section">
      <div className="search-form-section">
        <form id="search-form" onSubmit={(event) => Search(event)}>
          <input
            type="text"
            placeholder="enter search term"
            id="search"
            onChange={(event) => setUpdateKeyword(event.target.value)}
          />
          <input type="submit" value="Search" id="search-btn" />
        </form>
      </div>

      <div className="sort-form-section">
        <form>
          <label>
            <select
              id="dropdown-area"
              onChange={(event) => {
                changeFilterType(event.target.value);
              }}
            >
              <option value="1">Date Added (Newest)</option>
              <option value="2">Date Added (Oldest)</option>
              <option value="3">Name (Ascending)</option>
              <option value="4">Name (Descending)</option>
              <option value="5">Rating (Ascending)</option>
              <option value="6">Rating (Descending)</option>
              <option value="7">Price (Ascending)</option>
              <option value="8">Price (Descending)</option>
            </select>
          </label>
        </form>
      </div>
    </div>
  );
}

export default Filters;
