import React from "react";
import personService from "../services/person";

const Person = ({ person, setPersons, setNotification }) => {
  const deletePerson = (event) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setNotification({ text: `Deleted ${person.name} `, type: "success" });
        })
        .catch((error) => {
          setNotification({
            text: `Information of ${person.name} has already been removed from server`,
            type: "error",
          });
        });
      personService.getAll().then((res) => {
        setPersons(res.data);
      });
    }
  };
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={deletePerson}>delete</button>
      </p>
    </div>
  );
};

const Persons = ({ persons, setPersons, setNotification }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          setPersons={setPersons}
          setNotification={setNotification}
        />
      ))}
    </div>
  );
};

export default Persons;
