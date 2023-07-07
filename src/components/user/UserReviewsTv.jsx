import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { deleteReviewTv, getReviewByUser } from "../../api/reviewtv";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";
import ConfirmModal from "../models/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../models/EditRatingModalTv";



export default function UserReviewsTv() {
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  // const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);

  const { userId } = useParams();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;
  
  const { updateNotification } = useNotification();

  const fetchReviews = async () => {
    const { movie, error } = await getReviewByUser(userId);
    if (error) return console.log("Reviews Error:", error);

    setReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };

  
  // const findProfileOwnersReview = () => {
  //   if (profileOwnersReview) return setProfileOwnersReview(null);

  //   const matched = reviews.find((review) => review.owner === profileId);
  //   if (!matched)
  //     return updateNotification("error", "You don't have any review!");
    
  //   setProfileOwnersReview(matched);
  // };

  const handleOnEditClick = (review) => {
    
    
    setSelectedReview(review);
    
    setShowEditModal(true);
  };
  const displayConfirmModal = (review) => {
    setSelectedReview(review);
    setShowConfirmModal(true);
  };
  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReviewTv(selectedReview.id);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    hideConfirmModal();
    fetchReviews();
  };

  const handleOnReviewUpdate = (review) => {
    const updatedReview = reviews.map((r) => {  
      if (r.id === review.id) {
        return review;  
        }
        return r;
        });
        setReviews([...updatedReview]);
        fetchReviews();

  };

  // const displayConfirmModal = () => setShowConfirmModal(true);
  const hideConfirmModal = () => setShowConfirmModal(false);
  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };

  useEffect(() => {
    if (userId) fetchReviews();
  }, [userId]);;

  return (
    <div className="dark:bg-primary bg-white  min-h-screen pb-10">
      <Container className="xl:px-0 px-2 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary md:text-xl lg:text-2xl sm:text-[10px]">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              TV Reviews: 
            </span>{" "}
            {movieTitle}
          </h1>
{/* 
          {profileId ? (
            <CustomButtonLink
              label={profileOwnersReview ? "View All" : "Find My Review"}
              onClick={findProfileOwnersReview}
            />
          ) : null} */}
        </div>

        <NotFoundText text="No Reviews!" visible={!reviews.length} />

        {profileId !== userId ? (
        
        <div className="space-y-3 mt-3">
        {reviews.map((review) => (
          <ReviewCard review={review} key={review.id}/> 
          
        ))}
      </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.id} 
              onEditClick={() => handleOnEditClick(review)}
              onDeleteClick={() => displayConfirmModal(review)}/>
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

      <EditRatingModal
        visible={showEditModal}
        initialState={selectedReview}
        onSuccess={handleOnReviewUpdate}
        onClose={hideEditModal}
      />
    </div>
  );
}

const ReviewCard = ({ review, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  
 
  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };
  if (!review) return null;
  const { content, rating, parentTv } = review;
  if (!parentTv) return null;
  
  const { title, backdrop_path } = parentTv;
  return (
    <>
      {onDeleteClick && onEditClick ? (
        <div className="bg-white shadow dark:shadow-white dark:bg-secondary rounded h-19 overflow-hidden">
            <div
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className="flex cursor-pointer relative ">
        

    <img
      src={backdrop_path}
      alt={title}
      className="w-28 aspect-video object-cover"
    />
    <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
          {title}
          </h1>
          <p className="text-primary dark:text-white opacity-70 whitespace-nowrap">
          {content}
          </p>
    </div>
        <div className="flex items-center space-x-2 absolute top-2 right-2 text-2xl lg:text-lg bg-white dark:bg-secondary">
          <RatingStar rating={rating} />
        </div>

           <Options
           onEditClick={onEditClick}
           onDeleteClick={onDeleteClick}
           visible={showOptions}
         />
               </div>
               </div>
          ) : (
            <div className="bg-white shadow dark:shadow-white dark:bg-secondary rounded h-19 overflow-hidden">
            <div
            className="flex relative ">
        

    <img
      src={backdrop_path}
      alt={title}
      className="w-28 aspect-video object-cover"
    />
    <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
          {title}
          </h1>
          <p className="text-primary dark:text-white opacity-70 whitespace-nowrap">
          {content}
          </p>
    </div>
        <div className="flex items-center space-x-2 absolute top-2 right-2 text-2xl lg:text-lg bg-white dark:bg-secondary">
          <RatingStar rating={rating} />
        </div>

           
               </div>
               </div>
          )}

    
         </>
  );
};
const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};