import React, { useState, useEffect} from "react";
import { FaSquare, FaRegSquare } from "react-icons/fa";
import Submit from "./Submit";

const createArray = (count) => {
  return new Array(count).fill("");
};

const ratings = createArray(10);

export default function RatingFormSchool({ busy, initialState, onSubmit, }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");
  const [CRT, setCRT] = useState(false);
  const [trans_grooming, setTrans_grooming] = useState(false);
  const [trans_pronouns, setTrans_pronouns] = useState(false);
  const [trans_bathroom, setTrans_bathroom] = useState(false);
  const [globalWarming, setGlobalWarming] = useState(false);
  const [anti_parents_rights, setAnti_parents_rights] = useState(false);
  
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

  const handleOnChangeTrans_grooming = ({ target }) => {
    document.getElementById("trans_grooming").checked = trans_grooming;
    setTrans_grooming(target.value);
  };

  const handleOnChangeTrans_pronouns = ({ target }) => {
    document.getElementById("trans_pronouns").checked = trans_pronouns;
    setTrans_pronouns(target.value);
  };

  const handleOnChangeTrans_bathroom = ({ target }) => {
    document.getElementById("trans_bathroom").checked = trans_bathroom;
    setTrans_bathroom(target.value);
  };

  const handleOnChangeGlobalWarming = ({ target }) => {
    document.getElementById("globalWarming").checked = globalWarming;
    setGlobalWarming(target.value);
  };

  const handleOnChangeAnti_parents_rights = ({ target }) => {
    document.getElementById("anti_parents_rights").checked = anti_parents_rights;
    setAnti_parents_rights(target.value);
  };



  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    const data = {
      rating: selectedRatings.length,
      content,
      CRT,
      trans_grooming,
      trans_pronouns,
      trans_bathroom,
      globalWarming,
      anti_parents_rights,
      
    };

    onSubmit(data);
  };
  
  useEffect(() => {
  if (initialState) {
    setContent(initialState.content);
    setSelectedRatings(createArray(initialState.rating));
    setCRT(initialState.CRT);
    setTrans_grooming(initialState.trans_grooming);
    setTrans_pronouns(initialState.trans_pronouns)
    setTrans_bathroom(initialState.trans_bathroom);
    setGlobalWarming(initialState.globalWarming);
    setAnti_parents_rights(initialState.anti_parents_rights);
    

  }
}, [initialState]);

  return (
    <div>
      <div className="p-5 dark:bg-primary bg-white rounded space-y-3">
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
        Woke Alerts:</h1>
            <Checkbox label="CRT Related Material" prop="CRT" checked={CRT} onChange={handleOnChangeCRT} />
            <Checkbox label="Trans/Queer Theory" prop="trans_grooming" checked={trans_grooming} onChange={handleOnChangeTrans_grooming} />
            <Checkbox label="Require Trans Pronouns" prop="trans_pronouns" checked={trans_pronouns} onChange={handleOnChangeTrans_pronouns} />
            <Checkbox label="Trans Bathrooms Policy" prop="trans_bathroom" checked={trans_bathroom} onChange={handleOnChangeTrans_bathroom} />
            <Checkbox label="Climate Change Hysteria" prop="globalWarming" checked={globalWarming} onChange={handleOnChangeGlobalWarming} />
            <Checkbox label="Anti Parental Rights" prop="anti_parents_rights" checked={anti_parents_rights} onChange={handleOnChangeAnti_parents_rights} />

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