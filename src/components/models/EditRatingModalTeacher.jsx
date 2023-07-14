import React, { useState } from "react";

import { updateReviewTeacher} from "../../api/reviewsteacher";
import { useNotification } from "../../hooks";
import RatingFormTeacher from "../form/RatingFormTeacher";
import ModalContainer from "./ModalContainer";

export default function EditRatingModal({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message } = await updateReviewTeacher(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    onSuccess({ ...data });
    updateNotification("success", message);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingFormTeacher
        busy={busy}
        initialState={initialState}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
}
