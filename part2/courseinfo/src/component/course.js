import React from "react";

const Header = ({ course }) => <h1>{course.name}</h1>;
const Total = ({ parts }) => {
  const sum = parts.reduce((pre, cur) => pre + cur.exercises, 0);
  return <p>total of exercises {sum}</p>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
