import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";

const Day = () => {
  const { day } = useParams();

  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const onClickPrev = () => {
    currentPage === 0
      ? setCurrentPage(currentPage - 1)
      : setCurrentPage(dailyData.sentences.length - 1);
  };

  const onClickNext = () => {
    currentPage === dailyData.sentences.length - 1
      ? setCurrentPage(0)
      : setCurrentPage(currentPage + 1);
  };

  const clickBlackVeil = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    englishData.forEach((item, idx) => {
      if (item.day === +day) setDailyData(item);
    });
  }, [day]);

  if (!dailyData) return <div>Loading</div>;
  return (
    <div className="container relative">
      <div className="absolute  top-4 left-4">
        <Link to="/" className="button-style">
          back
        </Link>
      </div>
      <h1 className="text-center">
        Day {dailyData.day} : {dailyData.title}
      </h1>
      <div className="mt-12">
        <div>{dailyData.sentences[currentPage].english}</div>
        <button
          onClick={clickBlackVeil}
          className={`${isVisible ? "" : "bg-black hover:bg-transparent"}`}
        >
          {dailyData.sentences[currentPage].korean}
        </button>
      </div>
      <div className="flex flex-row gap-2 mt-8">
        <button onClick={onClickPrev} className="button-style">
          Prev
        </button>
        <button onClick={onClickNext} className="button-style">
          Next
        </button>
        <button className="button-style">Sound</button>
      </div>
    </div>
  );
};

export default Day;
