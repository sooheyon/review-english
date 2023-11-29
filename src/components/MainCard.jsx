import React from "react";
import { Link } from "react-router-dom";

const MainCard = ({ title, day }) => {
  return (
    <Link to={`/${day}`}>
      <li className="box-style box-animation">
        <span className="text-lg font-bold mb-2">DAY {day}</span>
        <p className="text-2xl items-center">
          <span className="text-lg mr-1">✏️</span> {title}
        </p>
      </li>
    </Link>
  );
};

export default MainCard;
