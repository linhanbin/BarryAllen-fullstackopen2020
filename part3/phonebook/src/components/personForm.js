import React, { useState } from "react";
import personService from "../services/person";

const PersonForm = ({ persons, setPersons, setNotification }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const sameName = persons.find((person) => person.name === newName);
    if (sameName) {
      window.alert(`${newName} is already added to phonebook`);
    }
    if (sameName) {
      if (
        window.confirm(
          `${sameName.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update({ ...sameName, number: newNumber }, sameName.id)
          .then((res) => {
            setPersons(
              persons.map((i) => (i.number !== newNumber ? i : res.data))
            );
          })
          .catch((error) => {
            console.log("error.response", error.response);
            setNotification({
              text: error.response.data.error,
              type: "error",
            });
          });
        setNewName("");
        setNewNumber("");
        setNotification({
          text: `Updated phone number of ${sameName.name}`,
          type: "success",
        });
        setTimeout(() => setNotification(null), 5000);
      }
    } else {
      personService
        .create(newPerson)
        .then((res) => {
          setPersons(persons.concat(res.data));
          setNewName("");
          setNewNumber("");
          setNotification({ text: `Added ${newPerson.name}`, type: "success" });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch((error) => {
          console.log("error.response", error.response);
          setNotification({
            text: error.response.data.error,
            type: "error",
          });
        });
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
