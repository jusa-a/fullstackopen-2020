import React, { useState, useEffect } from "react";
import personService from "./service/persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [notification, setNotification] = useState({});

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const emptyFields = () => {
        setNewName("");
        setNewNumber("");
    };

    const handleNameChange = (event) => setNewName(event.target.value);
    const handleNumberChange = (event) => setNewNumber(event.target.value);
    const handleFilterChange = (event) => setNewFilter(event.target.value);

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

        personService
            .add(personObject)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                emptyFields();
                setNotification({ message: `Added ${returnedPerson.name}` });
                setTimeout(() => {
                    setNotification({});
                }, 2000);
            })
            .catch((e) => {
                console.log(e.response.data);
                setNotification({ message: e.response.data, type: "error" });
            });
    };

    const changeNumber = () => {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };

        personService
            .update(person.id, changedPerson)
            .then((returnedPerson) => {
                setPersons(
                    persons.map((p) =>
                        p.name !== newName ? p : returnedPerson
                    )
                );
                setNotification({
                    message: `Changed number of ${changedPerson.name}`,
                });
                setTimeout(() => {
                    setNotification({});
                }, 2000);
            })
            .catch((e) => {
                setNotification({
                    message: `Information of '${newName}' has already been removed from server`,
                    type: "error",
                });
                setTimeout(() => {
                    setNotification({});
                }, 2000);
                setPersons(persons.filter((p) => p.name !== newName));
            });

        emptyFields();
    };

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter((p) => p.id !== id));
                    setNotification({ message: `Deleted ${name}` });
                    setTimeout(() => {
                        setNotification({});
                    }, 2000);
                })
                .catch((e) => {
                    setNotification({
                        message: `Information of '${newName}' has already been removed from server`,
                        type: "error",
                    });
                    setTimeout(() => {
                        setNotification({});
                    }, 2000);
                    setPersons(persons.filter((p) => p.id !== id));
                });
        }
    };

    const personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />
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
