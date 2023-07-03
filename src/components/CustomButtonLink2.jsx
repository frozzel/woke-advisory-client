import React from "react";
import { Link } from "react-router-dom";

export default function CustomButtonLink2({ label, url, rating, clickable = true, onClick }) {
  let className = clickable
    if (rating > 1 && rating <= 6) {
       className= "text-warning  hover:underline"
      
    } else if (rating > 6 && rating < 11) {
       className= "text-run  hover:underline"
    } else if (rating === null) {
      className= "text-highlight dark:text-highlight-dark cursor-default hover:underline";
      } else if (rating <= 1 || rating === undefined) {
        className= "text-good  hover:underline"
    } 
  return (
    <Link target="_blank" to={url} className={className} type="button">
    <button onClick={onClick} className={className} type="button">
      {label}
    </button>
    </Link>
  );
}
