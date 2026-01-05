import { Row } from "react-bootstrap";
import NavList from "../NavList";
import { isVisFunc } from "../../scripts/trackCardVisibilityList";
import TrackVisibility from "react-on-screen";
import {useWindowDimensions }from "../../scripts/windowFunctions";
import "../../styles/home.scss"
import { MIN_NAV_LIST_WIDTH } from "../../constants/constants";

function Home() {
  const home_comp_names = ["Intro", "Resume"]
  const { width } = useWindowDimensions();
  const TrackedIntroComp = ({ isVisible}) => {
    isVisFunc(isVisible, "Intro")
    return(
      <div id="Intro" className="wd-intro d-flex justify-content-center my-10 py-10">
        <div key="Intro">
          <h1 className="intro-title">
            Who am I?
          </h1>
          <p>Hi I'm Jonathan, a graduate from Northeastern University with a computer science degree, business analytics minor and music minor. 
            I am currently a marketing/fundraising director for my non-profit dragon boat team. 
            I have a few years of experience in Java, JavaScript/typescript (includes React), python, SQL, HTML and CSS. 
            I participated in two Hackathons, one internship and a few years being a Teaching Assistant. 
            I’m a leader in my small community. I taught lion dance choreography at my club, led fellow peers during labs and office hours and coached dragon boats in my community. 
            I thoroughly enjoy working with software and enjoy the nuance in decisions when creating new applications. I love problem solving and when I play games they use tactics.</p>
        </div>
      </div>
    );
  }
  
  const TrackedResumeComp = ({ isVisible}) => {
    isVisFunc(isVisible, "Resume")
    return (
      <Row id="Resume" className={`d-flex justify-content-center`}>
        <object key="Resume"
                className="pdf-height"
                data="res/full-resume-for-website.pdf" 
                type="application/pdf">
            <p> Sorry seems like I wasn't able to load the pdf, but here is a link 
              <a href="res/full-resume-for-website.pdf"> to the PDF!</a>
            </p>
        </object>
      </Row>
    )}
  return (
    <>
      {NavList(home_comp_names)}
      <div className={`justify-content-center p-auto mt-5 gy-5 
        ${width > MIN_NAV_LIST_WIDTH ? "my-5 mx-nav-list mb-5" : "wd-mobile-margins" }`}>
        <TrackVisibility partialVisibility>
              <TrackedIntroComp />
        </TrackVisibility>
        <TrackVisibility partialVisibility>
            <TrackedResumeComp />
        </TrackVisibility>
      </div>
    </>
  );
}
export default Home;