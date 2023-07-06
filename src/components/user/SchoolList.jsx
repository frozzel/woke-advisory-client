import React from "react";
import { Link } from "react-router-dom";
import GridContainer from "../GridContainer";
import RatingStar from "../RatingStar";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};

export default function SchoolList({ title, schools = [] }) {
  
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
  const { id, backdrop_path, reviews , SchoolName, name, title, AddressStreet, AddressCity, AddressState, AddressZip, AddressZip4} = school;

  if (backdrop_path===null || backdrop_path===undefined){
    const  newScr = '/placeholder.png'
    return (
      <Link to={"/school/" + id}>
        {/* <img
          className="aspect-video object-cover w-full"
          src={newScr}
          alt={SchoolName}
        /> */}
        <h1
          className="text-lg dark:text-white text-secondary font-semibold"
          title={SchoolName}
        >
          {trimTitle(SchoolName)}
        </h1>
        <p
          className="text-lg dark:text-dark-subtle text-secondary "
          title={AddressStreet}
        >
          {trimTitle(AddressStreet)}
        </p>
        <p
          className="text-lg dark:text-dark-subtle text-secondary "
          title={AddressCity}
        >
          {trimTitle(AddressCity)}, {AddressState} {AddressZip}-{AddressZip4}
        </p>
        <RatingStar rating={reviews?.ratingAvg} />
 
      </Link>
    );
  } else  if (backdrop_path){
    const newScr = "https://image.tmdb.org/t/p/original" + backdrop_path
  return (
    <Link to={"/movie/" + id}>
      <img
        className="aspect-video object-cover w-full"
        src={newScr}
        alt={title}
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={name}
      >
        {trimTitle(name)}
      </h1>
      <RatingStar rating={reviews?.ratingAvg} />
   
    </Link>
  );}
};
