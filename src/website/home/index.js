import { Row } from "react-bootstrap";
import NavList from "../NavList";
import { isVisFunc } from "../../scripts/trackCardVisibilityList";
import TrackVisibility from "react-on-screen";
import {useWindowDimensions }from "../../scripts/windowFunctions";
import "../../styles/home.scss"
import { MIN_NAV_LIST_WIDTH } from "../../constants/constants";
import useAnimatedText from "../../scripts/animatedText";

function Home() {
  const home_comp_names = ["Intro", "Resume"]
  const { width } = useWindowDimensions();
  const introString = `Hi I'm Jonathan! I'm a software engineer who's excited to learn and play with software. 
            Currently working on either my webscrapper, possible godot game and whatever project takes my interest.
            Let me know if you want to do create something together. :)
            `
    const TrackedIntroComp = ({ isVisible}) => {
    isVisFunc(isVisible, "Intro")
    return(
      <div id="Intro" className="wd-intro d-flex justify-content-center my-10 py-10">
        <div key="Intro">
          <h1 className="intro-title mb-2rem">
            Who am I?
          </h1>
          <div className={`editor d-inline-block ${width > MIN_NAV_LIST_WIDTH ? "w-80 h-5" : "w-90 h-25" }`}>
            <span className={`d-inline-block intro-paragraph`}>
              {useAnimatedText(introString, 8)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  const TrackedResumeComp = ({ isVisible}) => {
    isVisFunc(isVisible, "Resume")
    return (
      <Row id="Resume" className={`d-flex justify-content-center`}>
        <embed
          className="pdf-viewer"
          src="res/full-resume-for-website.pdf"
          type="application/pdf">
        </embed>
      </Row>
    )}
  return (
    <>
      {NavList(home_comp_names)}
      <div className={`home-page justify-content-center p-auto mt-5 gy-5 
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