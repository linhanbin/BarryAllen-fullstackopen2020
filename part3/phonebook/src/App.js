import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Notification from "./components/notification";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter persons={persons} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
