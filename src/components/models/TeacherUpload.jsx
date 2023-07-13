import React, { useState } from "react";
import { updateTeacher } from "../../api/teacher";
import { useNotification } from "../../hooks";
import TeacherForm from "../form/TeacherForm";
import ModalContainer from "./ModalContainer";
import { act } from "react-dom/test-utils";

export default function UpdateTeacher({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    
    setBusy(true);
    const { error, teacher } = await updateTeacher(initialState._id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    
    onSuccess(teacher);
    updateNotification("success", "Teacher updated successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <TeacherForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Teacher"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}
