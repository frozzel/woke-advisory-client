import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import NotFoundText from "../NotFoundText";
import {IoSchool} from "react-icons/io5";

export default function UserFollowSchool({user}) {

  return (
    <div className="dark:bg-primary bg-white  pb-10">
      <Container className="xl:px-0 px-2 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary md:text-xl lg:text-2xl sm:text-[10px]">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
            Schools Following: 
            </span>{" "}
            {user?.length}
          </h1>

        </div>

        <NotFoundText text="Not Following Any Schools!" visible={!user?.length} />

      <div className="space-y-3 mt-3">
      {user?.map((review) => (
        <ReviewCard review={review} key={review._id}/> 
        
      ))}
    </div>

      </Container>

    </div>
  );
}

const ReviewCard = ({ review, }) => {
  if (!review) return null;
  const { SchoolName, _id, avatar, AddressStreet, AddressCity, AddressState, AddressZip } = review;

  const trimTitle = (text = "") => {
    if (text.length <= 30) return text;
    return text.substring(0, 25) + "...";
  };
  
  return (
    <>
      
<div className="bg-white shadow dark:shadow-white dark:bg-secondary rounded h-19 overflow-hidden">
<div className="flex relative items-center ">
        {avatar ? (<img
                className="w-20 h-20 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover  "
                src={avatar.url}
                alt="{name}"
              />):(<div className="flex items-center "><IoSchool className="w-18 h-18 text-2xl m-1 md:text-4xl md:m-2 text-primary dark:text-dark-subtle "/></div>)
            }
  
    <div className="px-2">
          <Link to={"/school/" + _id} className="  hover:underline">  
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
          {trimTitle(SchoolName)}
          </h1>
          </Link>
          <p className="text-primary dark:text-white opacity-70 whitespace-nowrap md:whitespace-normal">
          {AddressStreet}
          </p>
          <p className="text-primary dark:text-white opacity-70 whitespace-nowrap md:whitespace-normal">
          {AddressCity}, {AddressState} {AddressZip}
          </p>
    
    </div>

</div>
</div>

         </>
  );
};
