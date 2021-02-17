import React from "react";

const Languages = ({ country }) => {
    return (
        <div>
            <h2>languages</h2>
            <ul>
                {country.languages.map((language) => (
                    <li key={language.name}>{language.name}</li>
                ))}
            </ul>
        </div>
    );
};

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital: {country.capital}</div>
            <div>population: {country.population}</div>
            <Languages country={country} />
            <div>
                <img src={country.flag} alt="country-flag" width="150px" />
            </div>
        </div>
    );
};

export default Country;
