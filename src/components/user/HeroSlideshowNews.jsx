import React, { useState, useEffect, useRef, forwardRef } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getNews } from "../../api/news";  
import { useNotification } from "../../hooks";

let count = 0;
let intervalId;

let newTime = 0;
let lastTime = 0;

export default function HeroSlidShowNews() {
  const [currentSlide, setCurrentSlide] = useState({});
  const [clonedSlide, setClonedSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [upNext, setUpNext] = useState([]);
  const [visible, setVisible] = useState(true);
  const slideRef = useRef();
  const clonedSlideRef = useRef();

  const { updateNotification } = useNotification();

  const fetchLatestUploads = async (signal) => {
    const { error, news } = await getNews(signal);
    if (error) return updateNotification("error", error);
    
    setSlides([...news]);
    setCurrentSlide(news[0]);
  };

  const startSlideShow = () => {
    intervalId = setInterval(() => {
      newTime = Date.now();
      const delta = newTime - lastTime;
      if (delta < 8000) return clearInterval(intervalId);
      handleOnNextClick();
    }, 7500);
  };

  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };

  const updateUpNext = (currentIndex) => {
    if (!slides.length) return;

    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3;

    let newSlides = [...slides];
    newSlides = newSlides.slice(upNextCount, end);

    if (!newSlides.length) {
      newSlides = [...slides].slice(0, 3);
    }

    setUpNext([...newSlides]);
  };

  //0,1,2,3,4
  const handleOnNextClick = () => {
    lastTime = Date.now();
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-left");
    slideRef.current.classList.add("slide-in-from-right");
    updateUpNext(count);
  };

  const handleOnPrevClick = () => {
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;

    setCurrentSlide(slides[count]);
    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
    updateUpNext(count);
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-left",
      "slide-in-from-right",
      "slide-out-to-right",
      "slide-in-from-left",
    ];
    slideRef.current.classList.remove(...classes);
    clonedSlideRef.current.classList.remove(...classes);
    setClonedSlide({});
    startSlideShow();
  };

  const handleOnVisibilityChange = () => {
    const visibility = document.visibilityState;
    if (visibility === "hidden") setVisible(false);
    if (visibility === "visible") setVisible(true);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchLatestUploads(ac.signal);
    document.addEventListener("visibilitychange", handleOnVisibilityChange);

    return () => {
      pauseSlideShow();
      document.removeEventListener(
        "visibilitychange",
        handleOnVisibilityChange
      );
      ac.abort();
    };
  }, []);

  useEffect(() => {
    if (slides.length && visible) {
      startSlideShow();
      updateUpNext(count);
    } else pauseSlideShow();
  }, [slides.length, visible]);

  return (
    <div className="w-full flex">
      {/* Slide show section */}
      <div className="md:w-4/5 w-full aspect-video relative  overflow-hidden outline-none">
        {/* current slide */}
        <Slide
          ref={slideRef}
          title={currentSlide.title}
          src={currentSlide.urlToImage}
          _id={currentSlide._id}
          url={currentSlide.url}
          source={currentSlide.source}
          description={currentSlide.description}
        />

        {/* cloned slide */}
        <Slide
          ref={clonedSlideRef}
          onAnimationEnd={handleAnimationEnd}
          className="absolute inset-0"
          src={clonedSlide.urlToImage}
          title={clonedSlide.title}
          _id={currentSlide._id}
          url={currentSlide.url}
          source={currentSlide.source}
          description={currentSlide.description}
        />

        <SlideShowController
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>
      {/* Up Next Section */}
      <div className="w-1/5 md:block hidden space-y-3 px-3 outline-none">
        <h1 className="font-semibold text-2xl text-primary dark:text-white">
          Up Next
        </h1>
        {upNext.map(({ urlToImage, _id }) => {
       
          return (

              <img
              key={_id}
              src={urlToImage}
              alt=""
              className="aspect-video object-cover rounded outline-none cursor-pointer"
            />

            )}
            
        )}
          
      </div>
    </div>
  );
}

const SlideShowController = ({ onNextClick, onPrevClick }) => {
  const btnClass =
    "bg-primary rounded border-2 text-white text-xl p-2 outline-none";
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
      <button onClick={onPrevClick} className={btnClass} type="button">
        <AiOutlineDoubleLeft />
      </button>
      <button onClick={onNextClick} className={btnClass} type="button">
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

const Slide = forwardRef((props, ref) => {
  const { title, _id, src, url, source, description, className = "", ...rest } = props;
 
  return (
    <Link
      target="_blank"
      to={url}
      ref={ref}
      className={"w-full cursor-pointer block outline-none" + className}
      {...rest}
    >
      {src !== null ? (
        <img className="object-cover aspect-video outline-none" src={src} alt="" />
      ) : <img className="object-cover aspect-video outline-none" src= "https://s.yimg.com/ny/api/res/1.2/jkN.9wNtePdZFz3Qn6oyqw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/usa_today_news_641/58a68214d6e140c2161948f98b82d993" alt="" />}
      {title ? (
        <div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent outline-none">
          <h1 className="font-semibold md:text-4xl text-lg dark:text-highlight-dark text-highlight outline-none">
            {source}
            
          </h1>
          <h5 className="md:text-xl text-sm dark:text-highlight-dark text-highlight whitespace-nowrap outline-none">
            {title}
          </h5>
          <p className="dark:text-dark-subtle text-secondary  md:text-md md:contents hidden outline-none">{description}</p>
        </div>
        
      ) : null}
    </Link>
  );
});
