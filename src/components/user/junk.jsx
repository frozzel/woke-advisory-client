import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { deleteReviewTv, getReviewByUser } from "../../api/reviewtv";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import RatingStar from "../RatingStar";
import ConfirmModal from "../models/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../models/EditRatingModal";
import {Link} from "react-router-dom"


export default function UserReviewsTv() {
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
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

  const findProfileOwnersReview = () => {
    if (profileOwnersReview) return setProfileOwnersReview(null);

    const matched = reviews.find((review) => review.owner === profileId);
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
    const { error, message } = await deleteReviewTv(profileOwnersReview.id);
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

  useEffect(() => {
    if (userId) fetchReviews();
  }, [userId]);

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

        {profileOwnersReview ? (
          <div>
            <ReviewCard review={profileOwnersReview} />
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button onClick={displayConfirmModal} type="button">
                <BsTrash />
              </button>
              <button onClick={handleOnEditClick} type="button">
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
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

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const { content, rating, parentTv } = review;
  const { title, backdrop_path, TMDB_Id } = parentTv;
  return (
    <Link to={"/tv/" + TMDB_Id}>
    <div className="flex space-x-3">
       <div className="w-16 lg:w-24">
      <img
                className="w-full aspect-video"
                src={backdrop_path}
                alt={title}
              />
        {/* {getNameInitial(owner.name)} */}
      </div>
      <div>
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {title}
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle mb-2">{content}</p>
      </div>
    </div>
    </Link>
  );
};
