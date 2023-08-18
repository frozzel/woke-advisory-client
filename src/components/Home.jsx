import React, {useState, useEffect} from "react";
import Container from "./Container";
import NotVerified from "./user/NotVerified";
import {Link} from "react-router-dom"
import HeroSlideshowNews from "./user/HeroSlideshowNews";
import SchoolList from "./user/SchoolList";
import NotFoundText from "./NotFoundText";
import { searchPublicSchools} from "../api/school";
import { useNotification } from "../hooks";
import {IoSchool} from "react-icons/io5";
import AppSearchForm from './form/AppSearchForm'






export default function Home() {
    const [query, setQuery] = useState("Loudoun County High");
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
      <div className="dark:text-white text-primary text-lg pt-2 outline-none">
        
      <HeroSlideshowNews />
      
      </div>
        <NotVerified />
        
        <div className="space-y-3 py-2">
          <div className="grid lg:grid-cols-1">
          <div>
          <h1 className="dark:text-highlight-dark text-highlight text-xl pt-2 font-bold">Introducing the Woke Advisory Initiative</h1>
          <p className="dark:text-white text-primary text-lg pt-2 ">Greetings and welcome to the Woke Advisory Initiative. Our core objective is to furnish parents with the essential tools required to engage thoughtfully with the prevailing woke ideology, which has taken root within our educational institutions, media platforms, and commercial spheres.</p>
          <p className="dark:text-white text-primary text-lg pt-2 ">Our platform offers a comprehensive solution, enabling parents to meticulously evaluate and assess the cinematic content available based on a set of guiding principles. By doing so, we empower parents to make well-informed decisions concerning the suitability of movies for their children. Furthermore, this platform facilitates the exchange of insights among like-minded parents, enhancing their ability to reach informed consensus on suitable viewing choices.</p>
          {/* <div className=" items-center justify-center text-center p-3">
          <Link to="https://www.givesendgo.com/wokeadvisory" target="_blank" className="items-center justify-center text-center  "><button 
                className="h-6 w-24 bg-highlight text-white dark:bg-highlight-dark  hover:opacity-80 transition rounded-full items-center justify-center"
                type="button">Donate</button></Link>
          </div> */}
          </div>         
          {/* <img src="./logo.png" alt="logo" className="w-100 pt-2 rounded-lg ml-2" /> */}

          </div>
          <p className="dark:text-white text-primary text-lg pt-2 ">In addition, our education-focused component introduces a robust school rating framework, designed entirely around user-generated input. This system empowers you not only to evaluate schools and educators, but also to leverage our integrated social media infrastructure for real-time discussions on pressing educational matters and policy changes. This novel feature enables you to construct networks of parents united against unfavorable educational policies and the influence of activist educators.</p>
          <p className="dark:text-white text-primary text-lg pt-2 ">Our mission is anchored in the belief that our endeavors are not rooted in animosity. Rather, we champion the fundamental right of parents to exercise their discretion in determining the educational content and environments most aligned with their values. We hold a steadfast commitment to maintaining a discourse that is respectful and suitable for all ages. We uphold an open forum where all perspectives are welcomed, regardless of whether they align with our own.</p>
          <p className="dark:text-white text-primary text-lg pt-2 ">This is merely the inception of our endeavor. We humbly solicit your support in nurturing and expanding our initiative. We invite you to contribute through the provided link, propelling our vision forward. Our forthcoming enhancements encompass:</p>
          <div className="ml-[5%]">
          <ul className="list-disc">
            <li className="dark:text-highlight-dark text-highlight text-lg pt-2">Direct Messaging: A feature enabling direct communication with your followers and those you follow.</li>
            <li className="dark:text-highlight-dark text-highlight text-lg pt-2">Campaigns: A platform to foster fundraising initiatives for advocating school board reforms and local political races that endorse parental rights and educational choice.</li>
            <li className="dark:text-highlight-dark text-highlight text-lg pt-2">E-commerce Store: We aspire to offer merchandise including signs and paraphernalia to amplify awareness within your local community.</li>
            <li className="dark:text-highlight-dark text-highlight text-lg pt-2">Higher Education: Extending our functional rating systems to cover colleges and technical institutions beyond high school.</li>
            <li className="dark:text-highlight-dark text-highlight text-lg pt-2">Corporate Sphere: An effort aimed at encouraging businesses to reconsider ESG (Environmental, Social, Governance) and DEI (Diversity, Equity, and Inclusion) policies, which often exert undue influence on our communities.</li>
          </ul>
          </div>

          <p className="dark:text-white text-primary text-lg pt-2 ">Together, we embark on a journey to safeguard the values that matter most to us as parents, educators, and responsible citizens. Your partnership is pivotal as we work towards a more discerning and considerate future for our children and our society at large.</p>
          <div className=" items-center justify-center text-center p-3">
          <Link to="https://www.givesendgo.com/wokeadvisory" target="_blank" className="items-center justify-center text-center  "><button 
                className="h-6 w-24 bg-highlight text-white dark:bg-highlight-dark  hover:opacity-80 transition rounded-full items-center justify-center"
                type="button">Donate</button></Link>
          </div>
          
        </div>
                  <div className="dark:text-highlight-dark text-highlight text-lg  outline-none text-center md:text-left">
          <IoSchool className="inline-block w-6 h-6 mr-2 mb-2" /> Search Schools
        <AppSearchForm placeholder='Loudoun County High' inputClassName="border-2 border-light-subtle dark:border-dark-subtle  p-1 rounded bg-transparent text-sm outline-none focus:border-secondary focus:dark:border-white transition text-light-subtle dark:text-white sm:w-auto w-80 sm:text-lg"
              onSubmit={handleSearchSubmit} />
              </div>
        
        <div className="space-y-3 py-1">
        <SearchSchools 
          query={query}
          resultNotFound={resultNotFound}
          schools={schools}/>
        
        
        </div>
        
      </Container>
    </div>
  );
}
const SearchSchools= ({query, schools, resultNotFound}) =>{
return (<>
  <div className="dark:bg-primary bg-white  py-8">
  <Container className="px-2 xl:p-0">
     <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-4">
     Search Results:  <span className="text-light-subtle dark:text-dark-subtle"> <span></span> "{query}<span>"</span></span></h1>
    <NotFoundText text="Record not found!" visible={resultNotFound} />
    <SchoolList schools={schools}  />
  </Container>
  </div>


</>
)
}