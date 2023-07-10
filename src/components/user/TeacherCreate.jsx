import React, {useState, useEffect} from 'react'
import Container from '../Container'
import { useAuth, useNotification } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import AddTeacherModal from '../models/AddTeacherModal';
import TeachersCard from './TeachersCard';


export default function TeacherCreate() {
    const [showAddModal, setShowAddModal] = useState(false);

    const { authInfo } = useAuth();
    const navigate = useNavigate();

    const { isLoggedIn } = authInfo;
    


    const handleAddTeacher = () => {
        if (!isLoggedIn) return navigate("/auth/signIn");
        setShowAddModal(true);
      };

    const hideRatingModal = () => {
    setShowAddModal(false);
    };

    // const handleOnRatingSuccess = (reviews) => {
    //     setTeacher({ ...movie, SchoolReviews: { ...reviews } });
    //   };

    const test = () => {
        console.log("test")
    }
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10 pt-3">
      <Container className="xl:px-0 px-2">
        <div className="flex justify-around ">
            <div className=" flex-col-1/2  items-center justify-center	">
            <button onClick={handleAddTeacher}
                className="h-6 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded-full  "
                type="button">Add</button>
            </div>
            <div className="  flex-col-1/2  ">
       
            </div>
            
        </div>
        <TeachersCard />
      </Container>

      <AddTeacherModal visible={showAddModal} onClose={hideRatingModal} onSuccess={test} />
    </div>
  )
}
