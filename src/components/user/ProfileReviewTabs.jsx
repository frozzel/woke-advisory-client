import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { BiMoviePlay } from "react-icons/bi";
import {BiCameraMovie} from "react-icons/bi";
import {IoSchool} from "react-icons/io5";
import {FaRegAddressCard} from "react-icons/fa";
import MovieReviews from "./MovieReviews";

export default function ProfileReviewTabs() {
    const [activeTab, setActiveTab] = React.useState("Movies");
    const data = [
        {
            label: "Movies",
            value: "Movies",
            icon: BiCameraMovie,
            desc: <MovieReviews/>,
          },
        {
          label: "Tv Series",
          value: "Tv Series",
          icon: BiMoviePlay,
          desc: `It really matters and then like it really doesn't matter.
          What matters is the people who are sparked by it. And the people
          who are like offended by it, it doesn't matter.`,
        },

        {
          label: "School",
          value: "School",
          icon: IoSchool,
          desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
        },
        {
            label: "Teacher",
            value: "Teacher",
            icon: FaRegAddressCard,
            desc: `We're not always in the position that we want to be at.
            We're constantly growing. We're constantly making mistakes. We're
            constantly trying to express ourselves and actualize our dreams.`,
          },
      ];
  return (<>
    <Tabs value={activeTab}>
    <TabsHeader
      className="rounded-none border-b border-blue-gray-50 dark:border-dark-subtle dark:text-dark-subtle bg-transparent p-0 pt-10"
      indicatorProps={{
        className: "bg-transparent border-b-2 border-blue-500 dark:border-white shadow-none rounded-none",
      }}
    >
      {data.map(({ label, value, icon }) => (
        <Tab
          key={value}
          value={value}
          onClick={() => setActiveTab(value)}
          className={activeTab === value ? "text-blue-500 dark:text-white" : ""}>
          <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              <span className='hidden lg:contents'>{label}</span>
            </div>
        
        </Tab>
      ))}
    </TabsHeader>
    <TabsBody>
      {data.map(({ value, desc }) => (
        <TabPanel key={value} value={value} className='dark:text-dark-subtle'>
          {desc}
        </TabPanel>
      ))}
    </TabsBody>
  </Tabs>
  </>)
}
