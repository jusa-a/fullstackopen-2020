import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
    if (countries.length === 1) {
        return <Country country={countries[0]} />;
    } else if (countries.length < 10) {
        return (
            <ul>
                {countries.map((country) => (
                    <li key={country.name}>{country.name}</li>
                ))}
            </ul>
        );
    }
    return <div>Too many matches, specify another filter</div>;
};

export default Countries;
