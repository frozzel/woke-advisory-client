import React, {useState} from "react";
import { useParams  } from "react-router-dom";
import { createTeacher } from "../../api/teacher";
import { useNotification } from "../../hooks";
import TeacherForm from "../form/TeacherForm";
import ModalContainer from "./ModalContainer";

export default function AddTeacherModal({ visible, onSuccess, onClose}) {
  const [busy, setBusy] = useState(false);
  const { schoolId } = useParams();
  const { updateNotification } = useNotification();
  
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message, teachers } = await createTeacher(schoolId, data);
    if (error) return updateNotification("error", error);
    
    updateNotification("success", message);
    onSuccess(teachers);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}  ignoreContainer>
      <TeacherForm  
        onSubmit={!busy ? handleSubmit : null}
        title="Create New Teacher"
        btnTitle="Create"
        busy={busy}/>
    </ModalContainer>
  );
}
