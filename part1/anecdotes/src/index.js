import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);
const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  const handleAnecdote = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelected);
  };
  const maxVotes = Math.max(...votes);
  const maxAnecdotes = votes.indexOf(maxVotes);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxAnecdotes]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
