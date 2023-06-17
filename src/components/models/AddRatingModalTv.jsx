import React from "react";
import { useParams } from "react-router-dom";
import { addReviewTv } from "../../api/reviewtv";
import { useNotification } from "../../hooks";
import RatingForm from "../form/RatingForm";
import ModalContainer from "./ModalContainer";

export default function AddRatingModal({ visible, onSuccess, onClose, title, IMDB, overview, release_date, backdrop_path, trailer, trailer2, trailer3, genres, original_language }) {
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  
  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReviewTv(movieId, data, title, IMDB, overview, release_date, backdrop_path, trailer, trailer2, trailer3, genres, original_language);
    if (error) return updateNotification("error", error);
    
    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}  ignoreContainer>
      <RatingForm onSubmit={handleSubmit} title={title} IMDB={IMDB} overview={overview} release_date={release_date} backdrop_path={backdrop_path} trailer={trailer} trailer2={trailer2} trailer3={trailer3} genres={genres} original_language={original_language} />
    </ModalContainer>
  );
}
