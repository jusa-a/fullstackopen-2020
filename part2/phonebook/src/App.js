import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    useEffect(() => {
        console.log("effect");
        axios.get("http://localhost:3001/persons").then((response) => {
            console.log("promise fulfilled");
            setPersons(response.data);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const personObject = {
            name: newName,
            number: newNumber,
        };

        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newFilter} handleChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm
                onSubmit={addPerson}
                nameValue={newName}
                onNameChange={handleNameChange}
                numberValue={newNumber}
                onNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
