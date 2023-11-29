import React from "react";
import { Link } from "react-router-dom";

const MainCard = ({ title, day }) => {
  return (
    <Link to={`/${day}`}>
      <li className="flex flex-col mb-4 align hover:opacity-[0.6] shadow-mild active:opacity-[1] cursor-pointer active:scale-[0.96] transition-all p-4  rounded-lg ">
        <span className="text-lg font-bold mb-2">DAY {day}</span>
        <p className="text-2xl  items-center">
          <span className="text-lg mr-2">✏️</span> {title}
        </p>
      </li>
    </Link>
  );
};

export default MainCard;
