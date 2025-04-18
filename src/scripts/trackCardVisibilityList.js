import { Card, Carousel } from "react-bootstrap";
import "../styles/card-styles.css"
import TrackVisibility from 'react-on-screen';
import activateElement from "./activateElement";
import deactivateElement from "./deactivateElement";

function isVisFunc(isVisible, name) {
    if (isVisible) {
      activateElement(`HashLink${name}`)
    } else {
      deactivateElement(`HashLink${name}`)
    }
  } 

function cardList(project) {
    const slideList = JSON.parse(JSON.stringify(project.slides));
    const captionList = JSON.parse(JSON.stringify(project.captions));
    const ComponentToTrack = ({ isVisible }) => {
        isVisFunc(isVisible, project.name)
        return (
            <Card key={project.name} className="mb-15rem mt-5rem">
                <Card.Body className="wd-card text-center h-40">
                    <Carousel>
                        {slideList.map((slide, index) => {
                            return <Carousel.Item interval={5000} className="">
                                <img
                                    className="d-block w-100 h-40 mb-5 pb-5"
                                    src={`res/${slide}`}
                                    alt={`This is supposed be number ${index} slide img, something is wrong sorry!`}
                                />
                                <Carousel.Caption className="">
                                    <h5>{`${captionList[index]}`}</h5>
                                </Carousel.Caption>
                            </Carousel.Item>
                        })}
                    </Carousel>
                </Card.Body>
            </Card>);
    }
    return (
        <div id={project._id} className=" w-75 p-auto h-50">
            <TrackVisibility partialVisibility>
                <ComponentToTrack />
            </TrackVisibility>
        </div>
    );
} export {cardList, isVisFunc}