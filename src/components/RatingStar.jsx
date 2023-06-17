import React from "react";
import { FaRadiation } from "react-icons/fa";


export default function RatingStar({ rating }) {
  let RateProp = "";
  if (rating > 1 && rating <= 6) {
      RateProp = "text-warning ";
  } else if (rating > 6 && rating < 11) {
      RateProp = "text-run ";
  } else if (rating <= 1 || rating === undefined) {
      RateProp = "text-good ";
  } 
  
  if (!rating)
    return (
      <p className="text-good">No reviews</p>
    );

  return (
    <p className={RateProp + "flex items-center space-x-1 mt-1"}>
      <span>{rating}</span>
      <FaRadiation />
     
    </p>
  );
}
