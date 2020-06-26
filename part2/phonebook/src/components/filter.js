import React, { useState } from "react";

const Filter = ({ persons }) => {
  const [filterPersons, setFilterPersons] = useState([]);

  const handleChange = (event) => {
    setFilterPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <p>
        filter shown with <input onChange={handleChange} />
      </p>
      {filterPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Filter;
