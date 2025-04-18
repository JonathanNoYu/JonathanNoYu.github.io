import NavList from "../NavList";
import db from "../../Database";
import { cardList } from "../../scripts/trackCardVisibilityList";
import { Row } from "react-bootstrap";

function Gallery() {
  const projects = db.projects
  var list = projects.map((project) => project.name);
  return (
    <>
      {NavList(list)}
      <Row className="d-flex justify-content-center p-auto mt-5">
        {projects.map((project, index) =>
          cardList(project, index)
        )}
      </Row>
    </>
  );
}
export default Gallery;