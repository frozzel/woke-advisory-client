import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import RatingStar from "../RatingStar";
import ConfirmModal from "../models/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModalSchool from "../models/EditRatingModalSchool";
import {Link} from "react-router-dom"
import { getAlertsSchool, deleteReview } from "../../api/alertsschool";
import AddAlertSchoolModal from "../models/AddAlertSchoolModal";
import { useNavigate } from "react-router-dom";
import {FaHeart, FaRegHeart, FaRegComment} from "react-icons/fa"
import {BiDotsHorizontalRounded} from "react-icons/bi"
import {RiDeleteBackLine} from "react-icons/ri"

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};
let refreshs = false;

export default function AlertsSchool({ }) {
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [teachers, setTeachers] = useState([]);

  

  const { schoolId } = useParams();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();
  
  const { updateNotification } = useNotification();



  const fetchReviews = async () => {
    const { alerts, error } = await getAlertsSchool(schoolId);
    console.log(alerts)
    if (error) return console.log("Reviews Error:", error);
    const title = alerts[0]?.school
    setReviews([...alerts]);
    setMovieTitle(title?.SchoolName);
  };
  if(refreshs){
    fetchReviews();
    refreshs = false;
  }

  const findProfileOwnersReview = () => {
    if (profileOwnersReview) return setProfileOwnersReview(null);

    const matched = reviews.filter((review) => review.owner._id === profileId);
    
    if (!matched)
      return updateNotification("error", "You don't have any review!");
    
    setProfileOwnersReview(matched);
  };

  const handleOnEditClick = () => {
    const { id, content, rating} = profileOwnersReview;
    
    setSelectedReview({
      id,
      content,
      rating,
    });
    
    setShowEditModal(true);
  };
  
  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwnersReview.id);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnersReview.id
    );
    setReviews([...updatedReviews]);
    setProfileOwnersReview(null);
    hideConfirmModal();
  };

  const handleOnReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwnersReview,
      rating: review.rating,
      content: review.content,
      // CRT: review.CRT,
    };

    setProfileOwnersReview({ ...updatedReview });

    const newReviews = reviews.map((r) => {
      if (r.id === updatedReview.id) return updatedReview;
      return r;
    });

    setReviews([...newReviews]);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);
  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };
  const handleAddTeacher = () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    setShowAddModal(true);
  };

  const hideRatingModal = () => {
    setShowAddModal(false);
    };

  const handleOnRatingSuccess = (teachers) => {
        setTeachers({ ...teachers });
        setRefresh(true);
        
    };

  useEffect(() => {
    if (schoolId) fetchReviews();
  }, [schoolId]);

  useEffect(() => {
    if (refresh) fetchReviews();
  }, [refresh]);

  return (<>
    <AddAlertSchoolModal visible={showAddModal} onClose={hideRatingModal} onSuccess={handleOnRatingSuccess} />

    <div className="dark:bg-primary bg-white  pb-10">
      <Container className="xl:px-0 px-2 py-8">
        <div className="mb-3 md:text-left text-center ">
      <button onClick={handleAddTeacher}
                className="border-2 border-light-subtle dark:border-dark-subtle  p-1 rounded bg-transparent text-sm outline-none hover:border-secondary hover:dark:border-white transition text-light-subtle dark:text-dark-subtle w-40 md:w-40 sm:w-auto  sm:text-sm whitespace-nowrap"
                type="button">Add Alert</button>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary md:text-xl lg:text-2xl sm:text-[10px] whitespace-nowrap">
            <span className="text-light-subtle dark:text-dark-subtle font-normal" >
              Alerts:    
            </span>{"    "}{" "}
            {/* {movieTitle} */}
          </h1>
        {/* </div>
        <div className=" text-right"> */}
          

          {/* {profileId ? (
            <CustomButtonLink
              label={profileOwnersReview ? "View All" : "Find My Alert"}
              onClick={findProfileOwnersReview}
            />
          ) : null} */}
          
            
        </div>

        <NotFoundText text="No Alerts!" visible={!reviews.length} />

        {profileOwnersReview ? (
          <div>
            {profileOwnersReview.map((review) => (<>
                <ReviewCard review={review} key={review._id} />
                <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
                <button onClick={displayConfirmModal} type="button">
                  <BsTrash />
                </button>
                <button onClick={handleOnEditClick} type="button">
                  <BsPencilSquare />
                </button>
              </div></>
                ))}
            

          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review._id} />
            ))}
          </div>
        )}
      </Container>

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        subtitle="This action will remove this review permanently."
      />

      <EditRatingModalSchool
        visible={showEditModal}
        initialState={selectedReview}
        onSuccess={handleOnReviewUpdate}
        onClose={hideEditModal}
      />
    </div></>
  );
}

const ReviewCard = ({ review, }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [busy, setBusy] = useState(false);
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(review._id);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    // const updatedReviews = reviews.filter(
    //   (r) => r.id !== profileOwnersReview.id
    // );
    // setReviews([...updatedReviews]);
    // setProfileOwnersReview(null);
    refreshs = true;
    hideConfirmModal();
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);


  console.log("review", review)
  if (!review) return null;

  const { owner, content, comments, image, likes, school } = review;
  console.log("owner", owner)
  const count = likes.length;
  const avatar = owner.avatar?.url;
 
  return (
  <>
    {/* <Link to={`/profile/${userId}`}>
    <div className="flex flex-col md:flex-row space-x-3 mb-5">
      <div className='  flex md:justify-center mb-2'>
            {avatar ? (<img
                className="w-16 h-16 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover rounded-full "
                src={avatar}
                alt="{name}"
              />):( <div className="flex items-center justify-center w-16 h-16 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl md:text-4xl select-none">
        {getNameInitial(owner.name)}
      </div>)
            }
          </div>
      <div className=" ">
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {owner.name}
        </h1>
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
        <div className="  w-full aspect-auto ">
              {image.url ? ( <img className="" src={image.url} alt=""></img>
              ) : null}
            </div>


        
        <p className="text-light-subtle dark:text-dark-subtle">{comments[0]?.content}</p>
      </div>
    </div>
    </Link> */}

    <div className=" ">
  <div className="bg-transparent border rounded-sm max-w-md">
    <div class="flex items-center  px-4 py-3 ">
    
      
      
    {avatar ? (<img
                className="w-16 h-16  rounded-full "
                src={avatar}
                alt="{name}"
              />):( <div className="flex items-center justify-center w-16 h-16 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl md:text-4xl select-none">
        {getNameInitial(owner.name)}
        </div>)
            }
      
      <div className="ml-3 w-full">
      <Link to={`/profile/${owner._id}`}>
        <span className="text-sm font-semibold antialiased block leading-tight dark:text-white text-secondary">{owner.name}</span>
        <span className="text-gray-600 text-xs block">{school.SchoolName}</span>
        </Link>
      </div>
     
      
      <div className="flex w-full  object-right-top justify-end text-xl font-semibold antialiased  dark:text-white text-secondary   ">
        
        <button onClick={displayConfirmModal} type="button">
                  <RiDeleteBackLine />
                </button>
                {/* <button onClick={handleOnEditClick} type="button">
                  <BsPencilSquare />
                </button> */}
      </div>
    </div>
    <div className="ml-3 ">
        <span className="text-sm font-semibold antialiased block leading-tight dark:text-white text-secondary">{content}</span>
        
      </div>
    
    <div className="w-full    object-fill ">
    {image ? ( <img  src={image.url} alt="" className="w-full object-fill" />
              ) : null}
    </div>
    <div className="flex items-center justify-between mx-4 mt-3 mb-2">
      <div class="flex gap-5  dark:text-white text-secondary">
        <FaRegHeart/>
        <FaRegComment/>
      </div>
      <div class="flex">
        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
      </div>
    </div>
    <div class="font-semibold text-sm mx-4 mt-2 mb-4">{count} likes</div>
  </div>
</div>

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        subtitle="This action will remove this review permanently."
      />

    </>
  );
};
