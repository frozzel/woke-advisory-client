import React from "react";
import Container from "./Container";
import NotVerified from "./user/NotVerified";



export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <NotVerified />
       
        <div className="space-y-3 py-8">
          <div className="grid lg:grid-cols-2">
          <div>
          <h1 className="dark:text-highlight-dark text-highlight text-xl pt-2 font-bold">Introducing the Woke Advisory Initiative</h1>
          <p className="dark:text-white text-primary text-lg pt-2 ">Greetings and welcome to the Woke Advisory Initiative. Our core objective is to furnish parents with the essential tools required to engage thoughtfully with the prevailing woke ideology, which has taken root within our educational institutions, media platforms, and commercial spheres.</p>
          <p className="dark:text-white text-primary text-lg pt-2 ">Our platform offers a comprehensive solution, enabling parents to meticulously evaluate and assess the cinematic content available based on a set of guiding principles. By doing so, we empower parents to make well-informed decisions concerning the suitability of movies for their children. Furthermore, this platform facilitates the exchange of insights among like-minded parents, enhancing their ability to reach informed consensus on suitable viewing choices.</p>
          
          </div>         
          <img src="./logo.png" alt="logo" className="w-100 pt-2 rounded-lg ml-2" />

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
          
          
        </div>
        
      </Container>
    </div>
  );
}
