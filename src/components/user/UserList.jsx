import React from "react";
import { Link } from "react-router-dom";
import GridContainer from "../GridContainer";
import RatingStar from "../RatingStar";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};
const getNameInitial = (name = "") => {
    return name[0].toUpperCase();
  };

export default function UserList({ title, schools = [] }) {
  console.log(schools)
  
  if (!schools.length) return null;

  return (
    <div>
      {title ? (
        <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {schools.map((school) => {
          return <ListItem key={school.id} school={school} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ school }) => {
    console.log(school)
  
    if (!school) return null;
    const {name, avatar, about, grade, classType, id, reviewsTeacher} = school
    
    return (
    <>
      <Link to={`/teacher/${id}`}>
      
      <div className="flex flex-row space-x-3 mb-5">
        <div className='  flex md:justify-center mb-2'>
              {avatar ? (<img
                  className="w-20 h-20 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover rounded-full "
                  src={avatar.url}
                  alt="{name}"
                />):( <div className="flex items-center justify-center w-20 h-20 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl md:text-4xl select-none">
          {getNameInitial(name)}
        </div>)
              }
            </div>
        <div className=" ">
          <h1 className="dark:text-white text-secondary font-semibold text-lg">
            {name}
          </h1>
          <p className="text-light-subtle dark:text-dark-subtle">Grade: {grade} </p>
          <p className="text-light-subtle dark:text-dark-subtle text-xs">Class Type: {classType}</p>
         {/* <RatingStar rating={reviewsTeacher.ratingAvg} /> */}
        </div>
      </div>
     
      </Link>
      </>
    );
  };
