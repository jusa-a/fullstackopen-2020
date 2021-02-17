import React from "react";

const Search = ({ value, handleChange }) => {
    return (
        <div>
            <label>find countries </label>
            <input value={value} onChange={handleChange} />
        </div>
    );
};

export default Search;
