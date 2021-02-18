import React from "react";

const Person = ({ person, remove }) => {
    return (
        <li>
            {person.name} {person.number}{" "}
            <button onClick={() => remove(person.id, person.name)}>
                delete
            </button>
        </li>
    );
};

const Persons = ({ persons, remove }) => {
    return (
        <ul>
            {persons.map((person) => (
                <Person key={person.name} person={person} remove={remove} />
            ))}
        </ul>
    );
};

export default Persons;
