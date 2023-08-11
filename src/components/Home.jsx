import React from "react";
import Container from "./Container";
import NotVerified from "./user/NotVerified";



export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <NotVerified />
       
        <div className="space-y-3 py-8">
          <div className="dark:text-white text-primary text-lg pt-2 ">Coming Soon.....</div>
          <img src="./logo.png" alt="logo" className="w-100 pt-2 " />
          
        </div>
        
      </Container>
    </div>
  );
}
