import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleSchool } from "../../api/school";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModalSchool from "../models/AddRatingModalSchool";
import RatingStar from "../RatingStar";
import GaugeChart from 'react-gauge-chart';
import { BsFillCheckSquareFill, BsSquare } from "react-icons/bs";
import { getImage } from "../../api/news";
import { Link } from "react-router-dom";
import CustomButtonLink2 from "../CustomButtonLink2";
import SchoolReviewTabs from './SchoolReviewTabs';




const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "k";
};

let chartStyle = {};
const w = window.innerWidth;
if (w < 768) {
  chartStyle = {
    width: '150px',
    
  };
} else {
  chartStyle = {
    width: '200px',
  }
  };
let theme = localStorage.getItem('theme');


export default function SingleSchool() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [movie, setMovie] = useState({});
  const [image, setImage] = useState({});

  const { schoolId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const fetchMovie = async () => {
    const { error, school } = await getSingleSchool(schoolId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setMovie(school);
  };

  const fetchImages = async () => {
    const { error, oneImage } = await getImage();
    if (error) return updateNotification("error", error);
    setImage(oneImage);
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };



  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, SchoolReviews: { ...reviews } });
  };

  useEffect(() => {
    if (schoolId) fetchMovie() && window.scrollTo(0, 0) && fetchImages();
  }, [schoolId]);

  useEffect(() => {
    if (schoolId) fetchImages(schoolId);
  }, [schoolId]);



  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white ">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait
        </p>
      </div>
    );

  const {
    _id,
    SchoolReviews = {},
    SchoolAlerts = {},
    Teachers = {},
    SchoolName,
    AddressStreet,
    AddressCity,
    AddressState,
    AddressZip,
    AddressZip4,
    SchoolURL,
    AddressLatitude,
    AddressLongitude,
    DistrictName,
    DistrictURL,
    CountyName,
    Phone,
    LowGradeServed,
    HighGradeServed,
    LevelID,

  } = movie;


  let imgCheck = false;
//   const newScr = "https://image.tmdb.org/t/p/original" + backdrop_path
  if (SchoolReviews.ratingAvg > 1) imgCheck = true;
  
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10 pt-3">
      <Container className="xl:px-0 px-2">
        <div className="w-full flex">
        <div className=" w-full  items-center aspect-video relative overflow-hidden">
              {image.imageUrl ? ( <img className="" src={image.imageUrl} alt=""></img>
              ) : null}
              {imgCheck ?  (<img src="./logo.png" alt="logo" className="absolute top-4 right-4  flex flex-col w-16 md:w-32 lg:w-48" />): null}
              {SchoolName ? (
              <div className="absolute inset-0 flex flex-col justify-end py-0 md:py-2 lg:py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent">
                <h1 className="font-semibold text-md truncate md:text-2xl lg:text-4xl dark:text-highlight-dark text-highlight"> 
                  {SchoolName}
                </h1>
              </div>
            ) : null}
        </div>

        </div>  

        <div className="flex justify-between">
        <div className="flex flex-col ">
        <GaugeChart id="gauge-chart2" style={chartStyle} textColor={theme === 'dark' ? 'white' : '#000'}  needleColor={theme === 'dark' ? '#adadad' : '#DC143C'} needleBaseColor={theme === 'dark' ? '#adadad' : '#DC143C'}
              nrOfLevels={20}
              arcsLength={[0.1, 0.6, 0.3]}
              colors={['#5BE12C', '#F5CD19', '#DC143C']}
              percent={SchoolReviews.ratingAvg/10? SchoolReviews.ratingAvg/10 : 0.01}
              arcPadding={0.02}
            />
        </div>
        <div className=" flex-col sm:block hidden mt-2">
        <ListWithLabel2 label="CRT Related Material" children={SchoolReviews.CRT}></ListWithLabel2>
        <ListWithLabel2 label="Trans/Queer Theory" children={SchoolReviews.trans_grooming}></ListWithLabel2>
        <ListWithLabel2 label="Require Trans Pronouns" children={SchoolReviews.trans_pronouns}></ListWithLabel2>
        </div>
        <div className=" flex-col sm:block hidden mt-2">
        <ListWithLabel2 label="Trans Bathrooms Policy" children={SchoolReviews.trans_bathroom}></ListWithLabel2>
        <ListWithLabel2 label="Climate Change Hysteria" children={SchoolReviews.globalWarming}></ListWithLabel2>
        <ListWithLabel2 label="Anti Parental Rights" children={SchoolReviews.anti_parents_rights}></ListWithLabel2>
        </div>
          <div className="flex flex-col items-end mt-2">

            <RatingStar rating={SchoolReviews.ratingAvg} />
            <CustomButtonLink
              rating={SchoolReviews.ratingAvg}
              label={convertReviewCount(SchoolReviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/school/reviews/" + _id)}
            />
            <CustomButtonLink
              rating={SchoolReviews.ratingAvg}
              label="Rate the movie"
              onClick={handleOnRateMovie}
            />
          </div>
        </div>
        <div className="flex justify-between">

        </div>
        <div className=" flex-col sm:flex  lg:hidden md:hidden ">
        <ListWithLabel2 label="CRT Related Material" children={SchoolReviews.CRT}></ListWithLabel2>
        <ListWithLabel2 label="Trans/Queer Theory" children={SchoolReviews.trans_grooming}></ListWithLabel2>
        <ListWithLabel2 label="Require Trans Pronouns" children={SchoolReviews.trans_pronouns}></ListWithLabel2>
        </div>
        <div className="  flex-col sm:flex  lg:hidden md:hidden pb-3">
        <ListWithLabel2 label="Trans Bathrooms Policy" children={SchoolReviews.trans_bathroom}></ListWithLabel2>
        <ListWithLabel2 label="Climate Change Hysteria" children={SchoolReviews.globalWarming}></ListWithLabel2>
        <ListWithLabel2 label="Anti Parental Rights" children={SchoolReviews.anti_parents_rights}></ListWithLabel2>
        </div>
        

        <div className="mt-2  justify-between grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3">
        <div className="flex flex-col  ">
        
          <p className="text-light-subtle dark:text-dark-subtle font-bold">{AddressStreet}</p>
          <p className="text-light-subtle dark:text-dark-subtle font-bold">{AddressCity}, {AddressState} <span>{AddressZip} {AddressZip4}</span></p>
          <ListWithLabel label="Latitude/Longitude">
          <p className="text-light-subtle dark:text-dark-subtle"> {AddressLatitude}</p>
          <p className="text-light-subtle dark:text-dark-subtle">   {AddressLongitude}</p>
          </ListWithLabel>
          <ListWithLabel label="Phone Number:">
            <CustomButtonLink label={Phone} clickable={true} rating={null}/>
          </ListWithLabel>

          <ListWithLabel label="WebSite:">
            <CustomButtonLink2
              rating={null}
            //   label={convertDate(release_date)}
              clickable={true}
              url={SchoolURL}
              label={SchoolName}
            />
          </ListWithLabel>
          </div>
          <div className="flex-col  text-left md:text-right">
          <Link target="_blank" to={DistrictURL} className=" " type="button">
          <p className="text-light-subtle dark:text-dark-subtle font-bold">District: <span className="font-normal hover:underline truncate">{DistrictName}</span></p></Link>
          <p className="text-light-subtle dark:text-dark-subtle font-bold">County: <span className="font-normal">{CountyName}</span></p>
          <p className="text-light-subtle dark:text-dark-subtle font-semibold">Lowest Grade: {LowGradeServed}</p>
          <p className="text-light-subtle dark:text-dark-subtle font-semibold">Highest Grade: {HighGradeServed}</p>
          <p className="text-light-subtle dark:text-dark-subtle font-semibold">Level: {LevelID} School</p>

          </div>

        </div>
        <SchoolReviewTabs />
      </Container>

      <AddRatingModalSchool
        // title={title}
        // IMDB={IMDB}
        // overview={overview}
        // release_date={release_date}
        // genres={genres}
        // backdrop_path={backdrop_path}
        // trailer={trailer}
        // trailer2={trailer2}
        // trailer3={trailer3}
        // original_language={original_language}
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
      
 
      <div className=" dark:text-highlight-dark text-highlight text-[9px] md:text-sm lg:text-base xl:text-lg text-center mx-auto mt-6 hover:underline" >
          <Link target="_blank"
      to={image.profileUrl}><h1>Photo from Unsplash By {image.author} </h1></Link></div>
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};
const ListWithLabel2 = ({ children, label }) => {
  if (children === null) return null;
  if (children === undefined) return null;
  if (children > .01){
    return (
      <div className="flex space-x-2">
        <h1 className="text-light-subtle dark:text-dark-subtle font-semibold flex items-center space-x-1 mr-1 ">
        <BsFillCheckSquareFill /><span>{label}</span></h1>
      </div>
    )
  }
  return (
    <div className="flex space-x-2">
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold flex items-center space-x-1 mr-1 ">
      <BsSquare /><span>{label}</span></h1>
    </div>
  )

}
