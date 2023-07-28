import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import NotFoundText from "../NotFoundText";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

export default function UserFollowers({user}) {

 

  return (
    <div className="dark:bg-primary bg-white  pb-10">
      <Container className="xl:px-0 px-2 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary md:text-xl lg:text-2xl sm:text-[10px]">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
            Teachers Following: 
            </span>{" "}
            {user?.length}
          </h1>

        </div>

        <NotFoundText text="Not Following Any Teachers!" visible={!user?.length} />

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
  const { name, _id, avatar, about } = review;

  const trimTitle = (text = "") => {
    if (text.length <= 120) return text;
    return text.substring(0, 120) + "...";
  };
  
  return (
    <>
      
<div className="bg-white shadow dark:shadow-white dark:bg-secondary rounded h-19 overflow-hidden">
<div className="flex relative ">
        {avatar ? (<img
                className="w-20 h-20 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover  "
                src={avatar.url}
                alt="{name}"
              />):( <div className="flex items-center justify-center w-20 h-20 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px]  bg-light-subtle dark:bg-dark-subtle text-white text-xl md:text-4xl select-none">
        {getNameInitial(name)}
      </div>)
            }
  
    <div className="px-2">
          <Link to={"/teacher/" + _id} className="  hover:underline">  
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
          {name}
          </h1>
          </Link>
          <p className="text-primary dark:text-white opacity-70 whitespace-nowrap md:whitespace-normal">
          About: {trimTitle(about)}
          </p>
    
    </div>

</div>
</div>

         </>
  );
};
