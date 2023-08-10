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
  
  if (!schools.length) return null;
  
  return (
    <div>
      {title ? (
        <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      ) : null}
      {/* <GridContainer> */}
        {schools.map((school) => {
          return <ListItem key={school._id} school={school} />;
        })}
      {/* </GridContainer> */}
    </div>
  );
}

const ListItem = ({ school }) => {
  
    if (!school) return null;
    const {name, avatar, id, username, } = school
    
    return (
      <>
      
      <div className="bg-white shadow dark:shadow-white dark:bg-secondary rounded h-19 overflow-hidden">
      <div className="flex relative ">
              {avatar ? (<div className="flex items-center "><img
                      className="w-20 h-20 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover  "
                      src={avatar.url}
                      alt="{name}"
                    /></div>):( <div className="flex items-center "><span className="w-20 h-20 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px]  bg-light-subtle dark:bg-dark-subtle text-white text-2xl md:text-4xl select-none flex items-center justify-center">
                    {getNameInitial(name)}
                    </span>
                    </div>)
                  }
        
          <div className="px-2">
                <Link to={"/profile/" + id} className="  hover:underline">  
                <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
                {name}
                </h1>
                </Link>
                <p className="text-highlight dark:text-highlight-dark opacity-70 whitespace-nowrap md:whitespace-normal">
                @{trimTitle(username)}
                </p>
          
          </div>
      
      </div>
      </div>
      
               </>
    );
  };
