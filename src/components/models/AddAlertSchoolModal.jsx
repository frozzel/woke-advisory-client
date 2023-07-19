import React, {useState} from "react";
import { useParams  } from "react-router-dom";
import { addAlertsSchool } from "../../api/alertsschool";
import { useNotification } from "../../hooks";
import AlertForm from "../form/AlertForm";
import ModalContainer from "./ModalContainer";

export default function AddAlertSchoolModal({ visible, onSuccess, onClose}) {
  const [busy, setBusy] = useState(false);
  const { schoolId } = useParams();
  const { updateNotification } = useNotification();
  
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message, alert } = await addAlertsSchool(schoolId, data);
    if (error) return updateNotification("error", error);
    
    updateNotification("success", message);
    onSuccess(alert);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}  ignoreContainer>
      <AlertForm  
        onSubmit={!busy ? handleSubmit : null}
        title="Add Alert"
        btnTitle="Add Alert"
        busy={busy}/>
    </ModalContainer>
  );
}
