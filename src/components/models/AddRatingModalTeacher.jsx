import React from "react";
import { useParams } from "react-router-dom";
import { addReviewTeacher } from "../../api/reviewsteacher";
import { useNotification } from "../../hooks";
import RatingFormTeacher from "../form/RatingFormTeacher";
import ModalContainer from "./ModalContainer";

export default function AddRatingModalTeacher({ visible, onSuccess, onClose,  }) {
  const { teacherId } = useParams();
  const { updateNotification } = useNotification();
  
  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReviewTeacher(teacherId, data, );
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}  ignoreContainer>
      <RatingFormTeacher onSubmit={handleSubmit} />
    </ModalContainer>
  );
}
