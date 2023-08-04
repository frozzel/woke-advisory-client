import React, {useState} from "react";
import { useParams  } from "react-router-dom";
import { addAlertsTeacher } from "../../api/alertsteacher";
import { useNotification } from "../../hooks";
import AlertForm from "../form/AlertForm";
import ModalContainer from "./ModalContainer";

export default function AddAlertTeacherlModal({ visible, onSuccess, onClose}) {
  const [busy, setBusy] = useState(false);
  const { teacherId } = useParams();
  const { updateNotification } = useNotification();
  
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message, alert } = await addAlertsTeacher(teacherId, data);
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
        title="Add Alert Teacher"
        btnTitle="Add Alert"
        busy={busy}/>
    </ModalContainer>
  );
}
