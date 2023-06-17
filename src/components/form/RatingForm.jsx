import React, { useState, useEffect} from "react";
import { FaSquare, FaRegSquare } from "react-icons/fa";
import Submit from "./Submit";

const createArray = (count) => {
  return new Array(count).fill("");
};

const ratings = createArray(10);

export default function RatingForm({ busy, initialState, onSubmit, title, IMDB, overview, release_date, backdrop_path, trailer, trailer2, trailer3, genres, original_language}) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");
  const [CRT, setCRT] = useState(false);
  const [LGBTQ_content, setLGBTQ_content] = useState(false);
  const [trans_content, setTrans_content] = useState(false);
  const [anti_religion, setAnti_religion] = useState(false);
  const [globalWarming, setGlobalWarming] = useState(false);
  const [leftWing, setLeftWing] = useState(false);
  
  const handleMouseEnter = (index) => {
    const ratings = new Array(index + 1).fill("");
    setSelectedRatings([...ratings]);
  };

  const handleOnChange = ({ target }) => {
    setContent(target.value);
  };

  const handleOnChangeCRT = ({ target }) => {
    document.getElementById("CRT").checked = CRT;  
    setCRT(target.value);
  };

  const handleOnChangeLGBTQ_content = ({ target }) => {
    document.getElementById("LGBTQ_content").checked = LGBTQ_content;
    setLGBTQ_content(target.value);
  };

  const handleOnChangeTrans_content = ({ target }) => {
    document.getElementById("trans_content").checked = trans_content;
    setTrans_content(target.value);
  };

  const handleOnChangeAnti_religion = ({ target }) => {
    document.getElementById("anti_religion").checked = anti_religion;
    setAnti_religion(target.value);
  };

  const handleOnChangeGlobalWarming = ({ target }) => {
    document.getElementById("globalWarming").checked = globalWarming;
    setGlobalWarming(target.value);
  };

  const handleOnChangeLeftWing = ({ target }) => {
    document.getElementById("leftWing").checked = leftWing;
    setLeftWing(target.value);
  };



  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    const data = {
      rating: selectedRatings.length,
      content,
      CRT,
      LGBTQ_content,
      trans_content,
      anti_religion,
      globalWarming,
      leftWing,
      title,
      IMDB, overview, release_date, backdrop_path, trailer, trailer2, trailer3, genres, original_language
    };

    onSubmit(data);
  };
  
  useEffect(() => {
  if (initialState) {
    setContent(initialState.content);
    setSelectedRatings(createArray(initialState.rating));
    setCRT(initialState.CRT);
    setLGBTQ_content(initialState.LGBTQ_content);
    setAnti_religion(initialState.anti_religion);
    setGlobalWarming(initialState.globalWarming);
    setLeftWing(initialState.leftWing);
    setTrans_content(initialState.trans_content)

  }
}, [initialState]);

  return (
    <div>
      <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
        Woke Alerts:</h1>
            <Checkbox label="CRT Related Material" prop="CRT" checked={CRT} onChange={handleOnChangeCRT} />
            <Checkbox label="LGBTQ Content" prop="LGBTQ_content" checked={LGBTQ_content} onChange={handleOnChangeLGBTQ_content} />
            <Checkbox label="Trans/Queer Theory" prop="trans_content" checked={trans_content} onChange={handleOnChangeTrans_content} />
            <Checkbox label="Anti Religious Sentiment" prop="anti_religion" checked={anti_religion} onChange={handleOnChangeAnti_religion} />
            <Checkbox label="Climate Change Activism" prop="globalWarming" checked={globalWarming} onChange={handleOnChangeGlobalWarming} />
            <Checkbox label="Left Wing Propaganda" prop="leftWing" checked={leftWing} onChange={handleOnChangeLeftWing} />

        <h1 className="dark:text-white text-secondary font-semibold text-lg ">
        Woke Meter:</h1>
        <div className="text-highlight dark:text-highlight-dark flex items-center relative">
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className="flex items-center absolute top-1/2 -translate-y-1/2">
            <StarsFilled
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </div>

        <textarea
          value={content}
          onChange={handleOnChange}
          className="w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"
        ></textarea>

        <Submit busy={busy} onClick={handleSubmit} value="Rate This Movie" />
      </div>
    </div>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <FaRegSquare
        onMouseEnter={() => onMouseEnter(index)}
        className="cursor-pointer"
        key={index}
        size={24}
      />
    );
  });
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <FaSquare
        onMouseEnter={() => onMouseEnter(index)}
        className="cursor-pointer"
        key={index}
        size={24}
      />
    );
  });
};
const Checkbox = ({ label, checked, onChange, prop }) => {
  
  return (
    <div className="text-highlight dark:text-highlight-dark flex "> 
      <input onChange={onChange} type="checkbox" id={prop} name={prop} value={checked ? true: false} className="mr-2" />
      <label htmlFor={prop}>{label}</label>
    </div>
  );
} 