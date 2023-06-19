import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie1";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../models/AddRatingModal";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";
import MovieReviews from "./MovieReviews";
import ReactPlayer from 'react-player'
import TopRatedTVSeries from "./TopRatedTVSeries";
import GaugeChart from 'react-gauge-chart';
import { BsFillCheckSquareFill, BsSquare } from "react-icons/bs";
import TMDB from "../TMDB";



const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "k";
};

const convertDate = (date = "") => {
  return date.split("T")[0];
};
let chartStyle = {};
const w = window.innerWidth;
if (w < 768) {
  chartStyle = {
    width: '150px',
    
  };
} else {
  chartStyle = {
    width: '200px',
  }
  };
let theme = localStorage.getItem('theme');


export default function SingleMovie() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);

    setReady(true);
    setMovie(movie);
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signIn");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };



  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  useEffect(() => {
    if (movieId) fetchMovie() 
  }, [movieId]);



  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white ">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait
        </p>
      </div>
    );

  const {
    id,
    backdrop_path,
    title,
    overview,
    original_language,
    release_date,
    trailer,
    trailer2,
    trailer3,
    IMDB,
    reviews = {},
    genres = [],
  } = movie;

  let imgCheck = false;
  const newScr = "https://image.tmdb.org/t/p/original" + backdrop_path
  if (reviews.ratingAvg > 1) imgCheck = true;
  
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10 pt-3">
      <Container className="xl:px-0 px-2">
        <div className="w-full flex">
        <div className="md:w-4/5 w-full aspect-video relative overflow-hidden">
              {newScr ? ( <img className="" src={newScr} alt=""></img>
              ) : null}
              {imgCheck ?  (<img src="./logo.png" alt="logo" className="absolute top-4 right-4  flex flex-col w-16 md:w-32 lg:w-48" />): null}
              {title ? (
              <div className="absolute inset-0 flex flex-col justify-end py-0 md:py-2 lg:py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent">
                <h1 className="font-semibold text-lg md:text-2xl lg:text-4xl dark:text-highlight-dark text-highlight"> 
                  {title}
                </h1>
              </div>
            ) : null}
        </div>
          <div className="w-1/5 md:block hidden space-y-3 px-3">
              <h1 className="font-semibold text-2xl text-primary dark:text-white">
                Trailers
              </h1>
              {trailer ? (  
                  <ReactPlayer height="" width="" className='aspect-video object-cover rounded' controls={true} light={true} url={trailer}  playing/>
              ) : null
              }{trailer2 ? (
                <ReactPlayer height="" width="" className='aspect-video object-cover rounded' controls={true} light={true} url={trailer2}  playing/>
              ) : null
                }{trailer3 ? (
                  <ReactPlayer height="" width="" className='aspect-video object-cover rounded' controls={true} light={true} url={trailer3}  playing/>
              ) : null
                }
              
          </div>
        </div>  

        <div className="flex justify-between">
        <div className="flex flex-col ">
        <GaugeChart id="gauge-chart2" style={chartStyle} textColor={theme === 'dark' ? 'white' : '#000'}  needleColor={theme === 'dark' ? '#adadad' : '#DC143C'} needleBaseColor={theme === 'dark' ? '#adadad' : '#DC143C'}
              nrOfLevels={20}
              arcsLength={[0.1, 0.6, 0.3]}
              colors={['#5BE12C', '#F5CD19', '#DC143C']}
              percent={reviews.ratingAvg/10? reviews.ratingAvg/10 : 0.01}
              arcPadding={0.02}
            />
        </div>
        <div className=" flex-col sm:block hidden mt-2">
        <ListWithLabel2 label="CRT Related Material" children={reviews.CRT}></ListWithLabel2>
        <ListWithLabel2 label="LGBTQ Content" children={reviews.LGBTQ_content}></ListWithLabel2>
        <ListWithLabel2 label="Trans/Queer Theory" children={reviews.trans_content}></ListWithLabel2>
        </div>
        <div className=" flex-col sm:block hidden mt-2">
        <ListWithLabel2 label="Anti Religious Sentiment" children={reviews.anti_religion}></ListWithLabel2>
        <ListWithLabel2 label="Climate Change Activism" children={reviews.globalWarming}></ListWithLabel2>
        <ListWithLabel2 label="Left Wing Propaganda" children={reviews.leftWing}></ListWithLabel2>
        </div>
          <div className="flex flex-col items-end mt-2">

            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink
              rating={reviews.ratingAvg}
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/movie/reviews/" + id)}
            />
            <CustomButtonLink
              rating={reviews.ratingAvg}
              label="Rate the movie"
              onClick={handleOnRateMovie}
            />
          </div>
        </div>
        <div className="flex justify-between">

        </div>
        <div className=" flex-col sm:flex  lg:hidden md:hidden ">
        <ListWithLabel2 label="CRT Related Material" children={reviews.CRT}></ListWithLabel2>
        <ListWithLabel2 label="LGBTQ Content" children={reviews.LGBTQ_content}></ListWithLabel2>
        <ListWithLabel2 label="Trans/Queer Theory" children={reviews.trans_content}></ListWithLabel2>
        </div>
        <div className="  flex-col sm:flex  lg:hidden md:hidden pb-3">
        <ListWithLabel2 label="Anti Religious Sentiment" children={reviews.anti_religion}></ListWithLabel2>
        <ListWithLabel2 label="Climate Change Activism" children={reviews.globalWarming}></ListWithLabel2>
        <ListWithLabel2 label="Left Wing Propaganda" children={reviews.leftWing}></ListWithLabel2>
        </div>
        

        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{overview}</p>


          <ListWithLabel label="Language:">
            <CustomButtonLink label={original_language} clickable={false} rating={null}/>
          </ListWithLabel>

          <ListWithLabel label="Release Date:">
            <CustomButtonLink
              rating={null}
              label={convertDate(release_date)}
              clickable={false}
            />
          </ListWithLabel>

          <ListWithLabel label="Genres:">
            {genres.map((g) => (
              <CustomButtonLink label={g} key={g} clickable={false} rating={null}/>
            ))}
          </ListWithLabel>

          <RelatedMovies movieId={movieId} />
          <TopRatedTVSeries movieId={movieId} />
        </div>
      </Container>

      <AddRatingModal
        title={title}
        IMDB={IMDB}
        overview={overview}
        release_date={release_date}
        genres={genres}
        backdrop_path={backdrop_path}
        trailer={trailer}
        trailer2={trailer2}
        trailer3={trailer3}
        original_language={original_language}
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
      <MovieReviews movieId={movieId} />
      <TMDB />
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};
const ListWithLabel2 = ({ children, label }) => {
  if (children === null) return null;
  if (children === undefined) return null;
  if (children > .01){
    return (
      <div className="flex space-x-2">
        <h1 className="text-light-subtle dark:text-dark-subtle font-semibold flex items-center space-x-1 mr-1 ">
        <BsFillCheckSquareFill /><span>{label}</span></h1>
      </div>
    )
  }
  return (
    <div className="flex space-x-2">
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold flex items-center space-x-1 mr-1 ">
      <BsSquare /><span>{label}</span></h1>
    </div>
  )

}
