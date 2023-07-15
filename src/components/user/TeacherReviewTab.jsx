import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";


import UserReviewsTv from "./UserReviewsTv";
import MovieReviewsTeacher from './MovieReviewsTeacher';
import { FaRadiation } from "react-icons/fa";
import { TbAlertTriangleFilled } from "react-icons/tb";



export default function TeacherReviewTabs({refresh}) {
    const [activeTab, setActiveTab] = React.useState("Reviews");
    const data = [
        {
            label: "Reviews",
            value: "Reviews",
            icon: FaRadiation,
            desc: <MovieReviewsTeacher refresh={refresh}/>,
          },
        {
          label: "Alerts",
          value: "Alerts",
          icon: TbAlertTriangleFilled,
          desc: <UserReviewsTv />,
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
