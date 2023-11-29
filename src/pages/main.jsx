import React from "react";
import englishData from "../englishData.json";
import MainCard from "../components/MainCard";

const Main = () => {
  return (
    <div className="container">
      <h1 className="text-center text-4xl p-20 font-extrabold">
        🇬🇧 STUDY ENGLISH 🇺🇸
      </h1>
      <ul className="flex flex-col gap-2">
        {englishData.map((v, i) => {
          return <MainCard key={`e-${i}`} title={v.title} day={v.day} />;
        })}
      </ul>
    </div>
  );
};

export default Main;
