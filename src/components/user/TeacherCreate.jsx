import React, {useState, useEffect} from 'react'
import Container from '../Container'
import { useAuth, useNotification, useSearch } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import AddTeacherModal from '../models/AddTeacherModal';
import TeachersCard from './TeachersCard';
import { searchTeacher } from "../../api/teacher";
import AppSearchForm from "../form/AppSearchForm";
import NotFoundText from "../NotFoundText";
import TeacherList from "./TeacherList";


export default function TeacherCreate() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [results, setResults] = useState([]);
    const [resultNotFound, setResultNotFound] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [query, setQuery] = useState("");
    const [refresh, setRefresh] = useState(false);

    const { authInfo } = useAuth();
    const navigate = useNavigate();
    const { schoolId } = useParams();
    const { updateNotification } = useNotification();

    const { isLoggedIn } = authInfo;
    


    const handleAddTeacher = () => {
        if (!isLoggedIn) return navigate("/auth/signIn");
        setShowAddModal(true);
      };

    const hideRatingModal = () => {
    setShowAddModal(false);
    };

    const handleOnRatingSuccess = (teachers) => {
        setTeachers({ ...teachers });
        setRefresh(true);
        
      };

    
    const handleSearchSubmit = (query) => {
      setQuery(query);
    };
    const searchTeachers = async (query, schoolId) => {
      const { error, results } = await searchTeacher(query, schoolId);
    
      if (error) return updateNotification("error", error);
      if (!results.length) {
        setResultNotFound(true);
  
        return setTeachers([]);
      }
    
      setResultNotFound(false);
      setTeachers([...results]);
    };
    useEffect(() => {
      if (query.trim()) searchTeachers(query, schoolId);

      }, [query, schoolId]);

    


  return (
    <div className="dark:bg-primary bg-white  pb-10 pt-3">
      <Container className="xl:px-0 px-2">
        <div className="flex justify-around ">
            <div className=" flex-col-1/2  items-center justify-center	">
            <AppSearchForm
            
            onSubmit={handleSearchSubmit}
            placeholder="Search Teachers..."
            inputClassName="border-2 border-light-subtle dark:border-dark-subtle  p-1 rounded bg-transparent text-sm outline-none focus:border-secondary focus:dark:border-white transition text-light-subtle dark:text-white w-30 md:w-30 sm:w-auto  sm:text-sm"
          />
            
           
            </div>
            <div className="  flex-col-1/2  ">
            <button onClick={handleAddTeacher}
                className="border-2 border-light-subtle dark:border-dark-subtle  p-1 rounded bg-transparent text-sm outline-none hover:border-secondary hover:dark:border-white transition text-light-subtle dark:text-dark-subtle w-40 md:w-40 sm:w-auto  sm:text-sm whitespace-nowrap"
                type="button">Create Teacher</button>
            </div>
            
        </div>
        <SearchTeachers 
          query={query}
          resultNotFound={resultNotFound}
          schools={teachers}/>
        <TeachersCard schoolId={schoolId} refresh={refresh}/>
      </Container>

      <AddTeacherModal visible={showAddModal} onClose={hideRatingModal} onSuccess={handleOnRatingSuccess} />
    </div>
  )
}
const SearchTeachers= ({query, schools, resultNotFound}) =>{
  return (<>
    <div className="dark:bg-primary bg-white  py-8">
    <Container className="px-2 xl:p-0">
    {query ? (<>
       <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4">
       Search Results:  <span className="text-light-subtle dark:text-dark-subtle"> <span></span> "{query}<span>"</span></span></h1>
      <NotFoundText text="Record not found!" visible={resultNotFound} />
      <TeacherList schools={schools}  />
      </>):(null)}
      
    </Container>
    </div>
  
  
  </>
  )
  }