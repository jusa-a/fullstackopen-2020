import React from "react";
import Country from "./Country";
import Weather from "./Weather";

const Countries = ({ countries, handleShowClick }) => {
    if (countries.length === 0) {
        return <div>No mathes found</div>;
    } else if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} />
                <Weather country={countries[0]} />
            </div>
        );
    } else if (countries.length < 10) {
        return (
            <ul>
                {countries.map((country) => (
                    <li key={country.name}>
                        {country.name}{" "}
                        <button onClick={() => handleShowClick(country.name)}>
                            show
                        </button>
                    </li>
                ))}
            </ul>
        );
    }
    return <div>Too many matches, specify another filter</div>;
};

export default Countries;
