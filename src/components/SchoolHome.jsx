import React, {useState, useEffect} from 'react'
import Container from './Container'
import NotVerified from './user/NotVerified'
import AppSearchForm from './form/AppSearchForm'
import HeroSlideshowNews from './user/HeroSlideshowNews'
import { searchPublicSchools} from "../api/school";
import { useNotification } from "../hooks";
import NotFoundText from "./NotFoundText";
import SchoolList from "./user/SchoolList";
// import TopRatedMovies from "./user/TopRatedMovies";


export default function SchoolHome() {
    const [query, setQuery] = useState("hope");
    const [schools, setSchools] = useState([]);
    const [resultNotFound, setResultNotFound] = useState(false);

    const { updateNotification } = useNotification();

    const handleSearchSubmit = (query) => {
        setQuery(query);
      };

    const searchSchool = async (query) => {
      const { error, results } = await searchPublicSchools(query);
     
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
    
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
    <Container className="px-2 xl:p-0">
                        <div className="dark:text-white text-primary text-lg pt-2 "></div>
        <HeroSlideshowNews />
        <NotVerified />
        <AppSearchForm placeholder='Search Schools' inputClassName="border-2 border-light-subtle dark:border-dark-subtle  p-1 rounded bg-transparent text-sm outline-none focus:border-secondary focus:dark:border-white transition text-light-subtle dark:text-white sm:w-auto w-40 sm:text-lg "
              onSubmit={handleSearchSubmit} />
      
        <div className="space-y-3 py-8">
        <SearchSchools 
          query={query}
          resultNotFound={resultNotFound}
          schools={schools}/>
        
        
        </div>
        <div>
        {/* <TopRatedMovies /> */}
        </div>
        </Container>
    </div>
  )
}
const SearchSchools= ({query, schools, resultNotFound}) =>{
return (<>
  <div className="dark:bg-primary bg-white  py-8">
  <Container className="px-2 xl:p-0">
     <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4">
     Search Results:  <span className="text-primary dark:text-dark-subtle"> <span></span> "{query}<span>"</span></span></h1>
    <NotFoundText text="Record not found!" visible={resultNotFound} />
    <SchoolList schools={schools}  />
  </Container>
  </div>


</>
)
}