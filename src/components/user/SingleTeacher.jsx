import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTeacher } from "../../api/teacher";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModalTeacher from "../models/AddRatingModalTeacher";
import RatingStar from "../RatingStar";
import GaugeChart from 'react-gauge-chart';
import { BsFillCheckSquareFill, BsSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import TeacherReviewTab from './TeacherReviewTab';
import TeacherUpload from "../models/TeacherUpload";



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

const getNameInitial = (name = "") => {
    return name[0].toUpperCase();
  };


export default function SingleTeacher() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [movie, setMovie] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { teacherId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const navigate = useNavigate();

  const fetchMovie = async () => {
    const { error, Teacher } = await getSingleTeacher(teacherId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setMovie(Teacher);
  };
 
 
  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleOnEditClick = () => {
    const { _id, name, about, avatar, grade, classType } = movie;
    
    
    setSelectedUser({
      _id,
      name,
      about,
      avatar: avatar?.url,
      grade,
      classType
    });
    setShowEditModal(true);
   }
   const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };
  const handleOnTeacherUpdate = (movie) => {

    const updatedTeacher = {
      ...movie,
      name,
        about: movie.about,
        avatar: movie.avatar.url,
        grade: movie.grade,
        classType: movie.classType,

    };

    setMovie({ ...updatedTeacher });
    
;
  };


  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviewsTeacher: { ...reviews } });
    fetchMovie();
    setRefresh(true);
  };

  useEffect(() => {
    if (teacherId)fetchMovie() && window.scrollTo(0, 0);
  }, [teacherId]);






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
    reviewsTeacher = {},
    name,
    about,
    grade,
    classType,
    avatar,
    parentSchool,

  } = movie;

  let imgCheck = false;

  if (reviewsTeacher.ratingAvg > 1) imgCheck = true;
  
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10 pt-3">
      <Container className="xl:px-0 px-2">

      <div className=" pt-4 flex ">
        <div className="flex-row lg:flex  space-x-4">
          <div className='mb-4 flex justify-center '>
            {avatar ? (<img
                className=" w-32 h-32 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover rounded-full "
                src={avatar.url}
                alt="{name}"
              />):( <div className="flex items-center justify-center w-32 h-32 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-6xl md:text-8xl select-none">
              {getNameInitial(name ? name : "L")}
            </div>)
            }
          </div>
          <div className=''>
              <h1 className="text-dark dark:text-white font-semibold text-4xl mb-3 lg:mb-1 flex justify-center lg:justify-normal" >{name}</h1>
              <p className="text-light-subtle dark:text-dark-subtle font-bold">Grade: {grade}</p>
          <p className="text-light-subtle dark:text-dark-subtle font-bold">Subject: {classType}</p>
          <Link to={`/school/${parentSchool._id}`} className=" " type="button">
          <p className="text-light-subtle dark:text-dark-subtle font-bold">School: <span className="dark:text-highlight-dark text-highlight hover:underline">{parentSchool.SchoolName}</span></p>
          </Link>
              
          

          </div>

        </div>
        {imgCheck ?  (<img src="./logo.png" alt="logo" className="absolute right-4 md:right-2 xl:right-80 w-16 md:w-32 lg:w-48" />): null}
      </div>
      <div className="grid justify-items-stretch mt-2">
      {isLoggedIn  && isVerified ? (
      
      <button onClick={handleOnEditClick}
                className="h-6 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded-full justify-self-center md:justify-self-end  "
                type="button">Edit</button>

        ) : null}
        </div>
      <div className="grid justify-items-stretch">
      <p className="text-light-subtle dark:text-dark-subtle flex font-bold  mt-4 ml-4">About:</p>
      <p className="text-light-subtle dark:text-dark-subtle flex  mb-3  ml-4">{about}      </p>
        </div>
        <div className="flex justify-between">
        <div className="flex flex-col ">
        <GaugeChart id="gauge-chart2" style={chartStyle} textColor={theme === 'dark' ? 'white' : '#000'}  needleColor={theme === 'dark' ? '#adadad' : '#DC143C'} needleBaseColor={theme === 'dark' ? '#adadad' : '#DC143C'}
              nrOfLevels={20}
              arcsLength={[0.1, 0.6, 0.3]}
              colors={['#5BE12C', '#F5CD19', '#DC143C']}
              percent={reviewsTeacher.ratingAvg/10? reviewsTeacher.ratingAvg/10 : 0.01}
              arcPadding={0.02}
            />
        </div>
        <div className=" flex-col sm:block hidden mt-2">
        <ListWithLabel2 label="CRT Related Material" children={reviewsTeacher.CRT}></ListWithLabel2>
        <ListWithLabel2 label="Trans/Queer Theory" children={reviewsTeacher.trans_grooming}></ListWithLabel2>
        <ListWithLabel2 label="Require Trans Pronouns" children={reviewsTeacher.trans_pronouns}></ListWithLabel2>
        </div>
        <div className=" flex-col sm:block hidden mt-2">
        <ListWithLabel2 label="Trans Sports Policy" children={reviewsTeacher.trans_sports}></ListWithLabel2>
        <ListWithLabel2 label="Climate Change Hysteria" children={reviewsTeacher.globalWarming}></ListWithLabel2>
        <ListWithLabel2 label="Anti Parental Rights" children={reviewsTeacher.anti_parents_rights}></ListWithLabel2>
        </div>
          <div className="flex flex-col items-end mt-2">

            <RatingStar rating={reviewsTeacher.ratingAvg} />
            <CustomButtonLink
              rating={reviewsTeacher.ratingAvg}
              label={convertReviewCount(reviewsTeacher.reviewCount) + " Reviews"}
              onClick={() => navigate("/teacher/reviews/" + _id)}
            />
            <CustomButtonLink
              rating={reviewsTeacher.ratingAvg}
              label="Rate the Teacher"
              onClick={handleOnRateMovie}
            />
          </div>
        </div>
        <div className="flex justify-between">

        </div>
        <div className=" flex-col sm:flex  lg:hidden md:hidden ">
        <ListWithLabel2 label="CRT Related Material" children={reviewsTeacher.CRT}></ListWithLabel2>
        <ListWithLabel2 label="Trans/Queer Theory" children={reviewsTeacher.trans_grooming}></ListWithLabel2>
        <ListWithLabel2 label="Require Trans Pronouns" children={reviewsTeacher.trans_pronouns}></ListWithLabel2>
        </div>
        <div className="  flex-col sm:flex  lg:hidden md:hidden pb-3">
        <ListWithLabel2 label="Trans Sports Policy" children={reviewsTeacher.trans_sports}></ListWithLabel2>
        <ListWithLabel2 label="Climate Change Hysteria" children={reviewsTeacher.globalWarming}></ListWithLabel2>
        <ListWithLabel2 label="Anti Parental Rights" children={reviewsTeacher.anti_parents_rights}></ListWithLabel2>
        </div>
        


        <TeacherReviewTab refresh={refresh}/>

        <TeacherUpload
        visible={showEditModal}
        initialState={selectedUser}
        onSuccess={handleOnTeacherUpdate}
        onClose={hideEditModal}
      />
      </Container>

      <AddRatingModalTeacher
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
      
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
