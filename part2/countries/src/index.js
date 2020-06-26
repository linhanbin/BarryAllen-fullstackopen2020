import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

const Country = ({ country, isShow }) => {
  const [showDetail, setShowDetail] = useState(isShow);

  const handleClick = () => {
    setShowDetail(!isShow);
  };

  return (
    <div>
      <div style={{ display: showDetail ? "none" : "" }}>
        {country.name}
        <button onClick={handleClick}>show</button>
      </div>
      <div style={{ display: showDetail ? "" : "none" }}>
        <h1>{country.name} </h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} style={{ height: 100 }} />
      </div>
    </div>
  );
};

const Countries = ({ countries, filtered }) => {
  const filterCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filtered.toLowerCase())
  );

  if (filterCountries.length > 10) {
    return (
      <div>
        <p>Too many matches,specify another filter</p>
      </div>
    );
  }

  if (filterCountries.length > 1) {
    return (
      <div>
        {filterCountries.map((filterCountry) => (
          <Country
            key={filterCountry.name}
            country={filterCountry}
            isShow={false}
          />
        ))}
      </div>
    );
  }

  if (filterCountries.length === 1) {
    return (
      <div>
        {filterCountries.map((filterCountry) => (
          <Country country={filterCountry} isShow={true} />
        ))}
      </div>
    );
  }

  return null;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <p>
        find countries <input onChange={handleChange} />
      </p>
      <Countries countries={countries} filtered={filtered} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
