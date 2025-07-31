import { Row } from "react-bootstrap";
import NavList from "../NavList";
import { isVisFunc } from "../../scripts/trackCardVisibilityList";
import TrackVisibility from "react-on-screen";
import useWindowDimensions from "../../scripts/windowFunctions";

function Home() {
  const home_comp_names = ["Intro", "Resume"]
  const TrackedIntroComp = ({ isVisible}) => {
    isVisFunc(isVisible, "Intro")
    return(
      <div id="Intro" className="wd-intro d-flex justify-content-center my-10">
        <div key="Intro">
          <h1>
            WIP Intro Check out my gallery instead!!
          </h1>
          <p>Hi! I'm Jonathan, a graduate from Northeastern University. 
            I have a degree in Computer Science and two minors, Music and Business Analytics. I've worked in Java, Javascript, Python, HTML and CSS</p>
        </div>
      </div>
    );
  }
  
  const TrackedResumeComp = ({ isVisible}) => {
    isVisFunc(isVisible, "Resume")
    return (
      <Row id="Resume" className="d-flex justify-content-center my-5 mx-pdf mb-5">
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
      <TrackVisibility partialVisibility>
            <TrackedIntroComp />
      </TrackVisibility>
      <TrackVisibility partialVisibility>
           <TrackedResumeComp />
      </TrackVisibility>
    </>
  );
}
export default Home;