import React, {useState, useEffect} from 'react'
import { useSearchParams } from "react-router-dom";
import { searchPublicSchools} from "../../api/school";
import { useNotification } from "../../hooks";
import Container from "../Container";
import NotFoundText from "../NotFoundText";
import SchoolList from "./SchoolList";





export default function SearchSchools() {
    const [schools, setSchools] = useState([]);
    const [resultNotFound, setResultNotFound] = useState(false);


    const [searchParams] = useSearchParams();
    const query = searchParams.get("SchoolName");

    const { updateNotification } = useNotification();

    const searchSchool = async (val) => {
        const { error, results } = await searchPublicSchools(val);
        
        if (error) return updateNotification("error", error);
        if (!results.length) {
          setResultNotFound(true);
    
          return setSchools([]);
        }
      
        setResultNotFound(false);
        setSchools([...results]);
      };

    useEffect(() => {
        if (query.trim()) searchSchool(query);
      }, [query]);

  return (<>
    <div className="dark:bg-primary bg-white min-h-screen py-8">
    <Container className="px-2 xl:p-0">
       <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4">
       Search Results for Schools.....</h1>
      <NotFoundText text="Record not found!" visible={resultNotFound} />
      <SchoolList schools={schools}  />
    </Container>
    </div>

 
</>
  )
}
