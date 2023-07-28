import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";


import UserFollowing from "./UserFollowing";
import UserFollowers from "./UserFollowers";
import { FaUserGroup, FaUsers } from "react-icons/fa6";
import {FaSchoolCircleExclamation} from "react-icons/fa6";
import {MdOutlineCastForEducation} from "react-icons/md";
import UserFollowSchool from './UserFollowSchool';
import UserFollowTeacher from './UserFollowTeacher';

export default function ProfileReviewTabs({user}) {
    const [activeTab, setActiveTab] = React.useState("Following");
    const data = [
        {
            label: "Following",
            value: "Following",
            icon: FaUserGroup,
            desc: <UserFollowing user={user.following}/>,
          },
        {
          label: "Followers",
          value: "Followers",
          icon: FaUsers,
          desc: <UserFollowers user={user.followers}/>,
        },

        {
          label: "Schools",
          value: "Schools",
          icon: FaSchoolCircleExclamation,
          desc: <UserFollowSchool user={user.schoolsFollowing}/>,
        },
        {
            label: "Teachers",
            value: "Teachers",
            icon: MdOutlineCastForEducation,
            desc: <UserFollowTeacher user={user.teachersFollowing}/>,
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