import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [newSearch, setNewSearch] = useState("");

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    };

    const handleShowClick = (country) => {
        setNewSearch(country);
    };

    const countriesToShow = countries.filter((country) =>
        country.name.toLowerCase().includes(newSearch.toLowerCase())
    );

    return (
        <div>
            <Search value={newSearch} handleChange={handleSearchChange} />
            <Countries
                countries={countriesToShow}
                handleShowClick={handleShowClick}
            />
        </div>
    );
};

export default App;
