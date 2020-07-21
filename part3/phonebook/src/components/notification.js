import React from "react";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  let showStyle;
  if (notification.type === "success") {
    showStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
  } else {
    showStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
  }
  return <div style={showStyle}>{notification.text}</div>;
};
export default Notification;
