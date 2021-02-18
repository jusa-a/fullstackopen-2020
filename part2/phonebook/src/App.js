import React, { useState, useEffect } from "react";
import personsService from "./service/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    useEffect(() => {
        personsService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        if (persons.some((person) => person.name === newName)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                changeNumber();
            }
            return;
        }

        const personObject = {
            name: newName,
            number: newNumber,
        };

        personsService.add(personObject).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName("");
            setNewNumber("");
        });
    };

    const changeNumber = () => {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };

        personsService
            .update(person.id, changedPerson)
            .then((returnedPerson) => {
                setPersons(
                    persons.map((p) =>
                        p.name !== newName ? p : returnedPerson
                    )
                );
            })
            .catch((e) => {
                alert(`'${newName}' was already deleted from server`);
                setPersons(persons.filter((p) => p.name !== newName));
            });

        setNewName("");
        setNewNumber("");
    };

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personsService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter((p) => p.id !== id));
                })
                .catch((e) => {
                    alert(`'${name}' was already deleted from server`);
                    setPersons(persons.filter((p) => p.id !== id));
                });
        }
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
            <Persons persons={personsToShow} remove={deletePerson} />
        </div>
    );
};

export default App;
