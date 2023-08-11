import React from "react";
import Container from "./Container";
import HeroSlideshow from "./user/HeroSlideshow";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";
import TopRatedTVSeries from "./user/TopRatedTVSeries";
import TopRatedWebSeries from "./user/TopRatedWebSeries";
import TMDB from "./TMDB";


export default function MovieHome() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <NotVerified />
        {/* slider */}
        <div className="dark:text-white text-primary text-lg pt-2 ">Coming Soon.....</div>
        <HeroSlideshow />
        {/* Most rated movies */}
        <div className="space-y-3 py-8">
          <TopRatedMovies />
          
          <TopRatedTVSeries />
          <TopRatedWebSeries />
        </div>
        <TMDB />
      </Container>
    </div>
  );
}
