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
import { getTeacherBySchool,  } from "../../api/school";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

export default function TeachersCard() {
  const [reviews, setReviews] = useState([]);
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);

  const { schoolId } = useParams();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;
  
  const { updateNotification } = useNotification();

  const fetchReviews = async () => {
    const { teachers, error } = await getTeacherBySchool(schoolId);
    
    if (error) return console.log("Reviews Error:", error);
    
    setReviews([...teachers]);
    
  };
  
  const findProfileOwnersReview = () => {
    if (profileOwnersReview) return setProfileOwnersReview(null);

    const matched = reviews.find((review) => review.owner.id === profileId);
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
  
//   const handleDeleteConfirm = async () => {
//     setBusy(true);
//     const { error, message } = await deleteReview(profileOwnersReview.id);
//     setBusy(false);
//     if (error) return updateNotification("error", error);

//     updateNotification("success", message);

//     const updatedReviews = reviews.filter(
//       (r) => r.id !== profileOwnersReview.id
//     );
//     setReviews([...updatedReviews]);
//     setProfileOwnersReview(null);
//     hideConfirmModal();
//   };

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
    if (schoolId) fetchReviews();
  }, [schoolId]);

  return (
    
    <div className="dark:bg-primary bg-white  pb-10">
      <Container className="xl:px-0 px-2 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary md:text-xl lg:text-2xl sm:text-[10px]">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Teachers: 
            </span>{" "}
            
          </h1>

          {profileId ? (
            <CustomButtonLink
              label={profileOwnersReview ? "View All" : "Find My Review"}
              onClick={findProfileOwnersReview}
            />
          ) : null}
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
{/* 
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        subtitle="This action will remove this review permanently."
      /> */}

      <EditRatingModalSchool
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
  const {name, avatar, about, grade, classType} = review
  
//   const { owner, content, rating } = review;
//   const avatar = avatar.url;
//   const userId = owner.id;
  return (
  <>
    {/* <Link to={`/profile/${userId}`}> */}
    <div className="flex flex-col md:flex-row space-x-3 mb-5">
      <div className='  flex md:justify-center mb-2'>
            {avatar.url ? (<img
                className="w-16 h-16 md:min-w-[60px] md:min-h-[60px] md:max-w-[280px] aspect-square object-cover rounded-full "
                src={avatar.url}
                alt="{name}"
              />):( <div className="flex items-center justify-center w-16 h-16 md:min-w-[60px]  md:max-w-[280px] md:min-h-[60px]  md:max-h-[280px] rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl md:text-4xl select-none">
        {getNameInitial(name)}
      </div>)
            }
          </div>
      <div className=" ">
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {name}
        </h1>
        <p className="text-light-subtle dark:text-dark-subtle">Grade: {grade} </p>
        <p className="text-light-subtle dark:text-dark-subtle">Class Type: {classType}</p>
       <RatingStar rating={review.rating} />
      </div>
    </div>
    {/* </Link> */}
    </>
  );
};
