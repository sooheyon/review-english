import { useState } from "react";
import { useParams } from "react-router-dom";

const Day = () => {
  const { day } = useParams();

  const [dailyData, setDailyData] = useState();

  return <div>Day {day}</div>;
};

export default Day;
