import React, {useState} from "react";
import { useParams  } from "react-router-dom";
import { addAlertsSchool } from "../../api/post";
import { useNotification } from "../../hooks";
import AlertForm from "../form/AlertForm";
import ModalContainer from "./ModalContainer";

export default function AddPostModal({ visible, onSuccess, onClose}) {
  const [busy, setBusy] = useState(false);
  const { userId } = useParams();
  const { updateNotification } = useNotification();
  
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message, alert } = await addAlertsSchool(userId, data);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onSuccess(alert);
    setBusy(false);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}  ignoreContainer>
      <AlertForm  
        onSubmit={!busy ? handleSubmit : null}
        title="Add Post"
        btnTitle="Add Post"
        busy={busy}/>
    </ModalContainer>
  );
}
