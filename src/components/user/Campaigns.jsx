import React from 'react'
import { Link } from 'react-router-dom'

export default function Campaigns() {
  return (
    <div className="dark:bg-primary bg-white  pb-10 pt-3">
        <div className="dark:text-white text-primary text-lg pt-2 ">Coming Soon.....</div>
        <div className="dark:text-white text-primary text-lg pt-2 ">Campaigns are currently in development! Please help us to continue to build out features on this site by donating to our cause!</div>
        <div><span></span></div>
        
        <div className=" items-center justify-center text-center p-3 mt-6">
          <Link to="https://www.givesendgo.com/wokeadvisory" target="_blank" className="items-center justify-center text-center  "><button 
                className="h-6 w-24 bg-highlight text-white dark:bg-highlight-dark  hover:opacity-80 transition rounded-full items-center justify-center"
                type="button">Donate</button></Link>
          </div>
    </div>

  )
}
