import React from "react";
import { useParams } from "react-router-dom";
import { addReviewSchool } from "../../api/reviewschool";
import { useNotification } from "../../hooks";
import RatingFormSchool from "../form/RatingFormSchool";
import ModalContainer from "./ModalContainer";

export default function AddRatingModal({ visible, onSuccess, onClose,  }) {
  const { schoolId } = useParams();
  const { updateNotification } = useNotification();
  
  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReviewSchool(schoolId, data, );
    if (error) return updateNotification("error", error);
    
    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}  ignoreContainer>
      <RatingFormSchool onSubmit={handleSubmit} />
    </ModalContainer>
  );
}
