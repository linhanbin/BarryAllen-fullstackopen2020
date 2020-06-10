import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handcleClick, text }) => {
  return <button onClick={handcleClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const goodPercentage = (good / total) * 100 + "%";
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={goodPercentage} />
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> give feedback</h1>
      <Button
        handcleClick={() => {
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        handcleClick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        handcleClick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
