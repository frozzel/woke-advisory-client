import React from "react";

export default function CustomButtonLink({ label, rating, clickable = true, onClick }) {
  let className = clickable
    if (rating > 1 && rating <= 6) {
       className= "text-warning  hover:underline"
      
    } else if (rating > 6 && rating < 11) {
       className= "text-run  hover:underline"
    } else if (rating === null) {
      className= "text-highlight dark:text-highlight-dark cursor-default";
      } else if (rating <= 1 || rating === undefined) {
        className= "text-good  hover:underline"
    } 
  return (
    <button onClick={onClick} className={className} type="button">
      {label}
    </button>
  );
}
