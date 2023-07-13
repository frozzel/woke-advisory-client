import React, { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../../hooks";
import { commonInputClasses } from "../../utils/theme";
import PosterSelector from "../PosterSelector";
import Selector from "../Selector";

const defaultTeacherInfo = {
  name: "",
  about: "",
  avatar: null,
  grade: "",
  classType: "",
};

const gradeOptions = [
  { title: "Pre K", value: "pre-k" },
  { title: "Kindergarten", value: "kindergarten" },
  { title: "1st", value: "1st" },
    { title: "2nd", value: "2nd" },
    { title: "3rd", value: "3rd" },
    { title: "4th", value: "4th" },
    { title: "5th", value: "5th" },
    { title: "6th", value: "6th" },
    { title: "7th", value: "7th" },
    { title: "8th", value: "8th" },
    { title: "9th", value: "9th" },
    { title: "10th", value: "10th" },
    { title: "11th", value: "11th" },
    { title: "12th", value: "12th" },
    { title: "Other", value: "other" },
];
const classTypeOptions = [
    { title: "Math", value: "Math" },
    { title: "English", value: "English" },
    { title: "Social Studies", value: "Social Studies" },
      { title: "Science", value: "Science" },
      { title: "Coach", value: "Coach" },
      { title: "Admin", value: "Admin" },
      { title: "Vocational", value: "Vocational" },
      { title: "Board Member", value: "Board Member" },
      { title: "Counselor", value: "Counselor" },
      { title: "Other", value: "Other" },
      { title: "Multiple", value: "Multiple" },
     
  ];

const validateActor = ({ avatar, name, about, grade, classType }) => {
  if (!name.trim()) return { error: "Teachers name is missing!" };
  if (!about.trim()) return { error: "About section is empty!" };
  if (!grade.trim()) return { error: "Teachers Grade is missing!" };
  if (!classType.trim()) return { error: "Teachers Class Type is missing!" };
  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid image / avatar file!" };

  return { error: null };
};

export default function TeacherForm({
  title,
  initialState,
  btnTitle,
  busy,
  onSubmit,
}) {
  const [actorInfo, setActorInfo] = useState({ ...defaultTeacherInfo });
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");
  const { updateNotification } = useNotification();

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatarForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, files, name, about, grade, classType } = target;
    if (name === "avatar") {
      const file = files[0];
      updatePosterForUI(file);
      return setActorInfo({ ...actorInfo, avatar: file });
    }

    setActorInfo({ ...actorInfo, [name]: value, [about]: value, [grade]: value, [classType]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo);
    if (error) return updateNotification("error", error);
    
    // submit form
    const formData = new FormData();
    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }
    
    onSubmit(formData);
  };

  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState, avatar: null });
      setSelectedAvatarForUI(initialState.avatar);
    }
  }, [initialState]);

  const { name, about, grade, classType } = actorInfo;
 
  return (
    <form
      className="dark:bg-primary bg-white p-3 w-[35rem] rounded"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="h-8 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded flex items-center justify-center"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>

      <div className="flex space-x-2">
        <PosterSelector
          selectedPoster={selectedAvatarForUI}
          className="w-36 h-36 aspect-square object-cover"
          name="avatar"
          onChange={handleChange}
          label="Select avatar"
          accept="image/jpg, image/jpeg, image/png"
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            placeholder="Enter name"
            type="text"
            className={commonInputClasses + " border-b-2"}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <textarea
            name="about"
            value={about}
            onChange={handleChange}
            placeholder="About"
            className={commonInputClasses + " border-b-2 resize-none h-full"}
          ></textarea>
        </div>
      </div>

      <div className="mt-3 flex justify-evenly ">
        <Selector
          options={gradeOptions}
          label="Grade"
          value={grade}
          onChange={handleChange}
          name="grade"
          
        />
        <Selector
          options={classTypeOptions}
          label="Class Type"
          value={classType}
          onChange={handleChange}
          name="classType"
          
        />
        
      </div>
      
    </form>
  );
}
