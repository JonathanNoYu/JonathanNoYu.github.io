import { Card, Carousel } from "react-bootstrap";
import "../styles/card-styles.scss"
import TrackVisibility from 'react-on-screen';
import addAttrElement from "./addAttrElement";
import removeAttrElement from "./removeAttrElement";
import { useWindowDimensions } from "./windowFunctions";
import { MIN_NAV_LIST_WIDTH } from "../constants/constants";

function isVisFunc(isVisible, name) {
    if (isVisible) {
      addAttrElement(`HashLink${name}`, " wd-active text-white")
    } else {
      removeAttrElement(`HashLink${name}`, " wd-active text-white")
    }
  } 

function CardList(project) {
    const { width } = useWindowDimensions()
    const slideList = JSON.parse(JSON.stringify(project.slides));
    const captionList = JSON.parse(JSON.stringify(project.captions));
    const ComponentToTrack = ({ isVisible }) => {
        isVisFunc(isVisible, project.name)
        return (
            <Card key={project.name} className="mb-15rem mt-5rem">
                <Card.Body className="wd-card text-center">
                    <Carousel indicators={false}>
                        {slideList.map((slide, index) => {
                            return <Carousel.Item interval={5000} className="">
                                <img
                                    className="wd-carousel-image d-block pb-2"
                                    src={`res/${slide}`}
                                    alt={`Something is wrong sorry!`}
                                />
                                <p>Slide {index + 1}/{slideList.length}</p>
                                <h5>{`${captionList[index]}`}</h5>
                            </Carousel.Item>
                        })}
                    </Carousel>
                </Card.Body>
            </Card>);
    }
    return (
        <div id={project._id} className={`${width > MIN_NAV_LIST_WIDTH ? "w-85" : "wd-mobile-margins"}`}>
            <TrackVisibility partialVisibility>
                <ComponentToTrack />
            </TrackVisibility>
        </div>
    );
} export {CardList, isVisFunc}