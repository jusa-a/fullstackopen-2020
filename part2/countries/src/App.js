import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [newSearch, setNewSearch] = useState("");

    useEffect(() => {
        console.log("effect");
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            console.log("promise fulfilled");
            setCountries(response.data);
        });
    }, []);

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    };

    const countriesToShow = countries.filter((country) =>
        country.name.toLowerCase().includes(newSearch.toLowerCase())
    );

    return (
        <div>
            <Search value={newSearch} handleChange={handleSearchChange} />
            <Countries countries={countriesToShow} />
        </div>
    );
};

export default App;
