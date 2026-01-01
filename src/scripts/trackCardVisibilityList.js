import { Card, Carousel } from "react-bootstrap";
import "../styles/card-styles.scss"
import TrackVisibility from 'react-on-screen';
import addAttrElement from "./addAttrElement";
import removeAttrElement from "./removeAttrElement";

function isVisFunc(isVisible, name) {
    if (isVisible) {
      addAttrElement(`HashLink${name}`, " wd-active text-white")
    } else {
      removeAttrElement(`HashLink${name}`, " wd-active text-white")
    }
  } 

function CardList(project) {
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
                                    className="d-block w-100 pb-2"
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
        <div id={project._id} className="w-75">
            <TrackVisibility partialVisibility>
                <ComponentToTrack />
            </TrackVisibility>
        </div>
    );
} export {CardList, isVisFunc}