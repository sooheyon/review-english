import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import englishData from "../englishData.json";
import axios from "axios";
import { MdHomeFilled } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiSpeakerphone } from "react-icons/hi";

const Day = () => {
  const { day } = useParams();

  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const onClickSound = async () => {
    const baseURL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    const requestBody = {
      input: {
        text: dailyData.sentences[currentPage].english,
      },
      voice: {
        languageCode: "en-gb",
        name: "en-GB-Standard-A",
        ssmlGender: "FEMALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
        pitch: 15,
      },
    };
    try {
      if (isLoading) return;
      setIsLoading(true);
      const response = await axios.post(baseURL, requestBody);

      const binaryData = atob(response.data.audioContent);
      const byteArray = new Uint8Array(binaryData.length);

      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });
      const newAudio = new Audio(URL.createObjectURL(blob));

      document.body.appendChild(newAudio);
      newAudio.play();

      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
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
      <div className="absolute top-4 left-4">
        <Link to="/" className="icon-button-style">
          <MdHomeFilled size={24} />
        </Link>
      </div>
      <div className="flex flex-col items-center pt-10">
        <span className="text-xs text-gray-600 font-semibold text-center bg-gray-300 rounded-lg py-1 px-3">
          DAY {dailyData.day}
        </span>
        <h1 className="pt-3 pb-12">{dailyData.title}</h1>
      </div>
      <div className="mt-12 flex flex-col py-10 px-8 mb-8 box-style text-xl">
        <div className="flex flex-row justify-between">
          <span className="mb-3 font-semibold text-gray-600">
            Q{currentPage + 1}
          </span>
          <button onClick={onClickSound} className="icon-button-style">
            <HiSpeakerphone size={24} />
          </button>
        </div>

        <div className="flex flex-row pt-8">
          <span className="mr-4 text-2xl">🇬🇧</span>
          <span className="font-bold">
            {dailyData.sentences[currentPage].english}
          </span>
        </div>

        <div className="flex flex-row pt-8">
          <span className="mr-4 text-2xl">🇰🇷</span>
          <button
            onClick={clickBlackVeil}
            className={`w-full ${
              isVisible ? "" : "bg-black hover:bg-transparent"
            } transition-all text-left break-keep`}
          >
            {dailyData.sentences[currentPage].korean}
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-2 mt-20 text-xl">
        <button onClick={onClickPrev} className="icon-button-style">
          <IoIosArrowBack size={32} />
        </button>

        <span>{currentPage + 1}</span>
        <p className="text-md">/</p>
        <span>{dailyData.sentences.length}</span>

        <button onClick={onClickNext} className="icon-button-style">
          <IoIosArrowForward size={32} />
        </button>
      </div>
    </div>
  );
};

export default Day;
