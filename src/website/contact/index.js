import { Row } from "react-bootstrap";

function Contact() {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        <h2 className="wd-form-pre-message my-5">Contact me via Google Form!</h2>
      </div>
      <Row className="d-flex justify-content-center p-auto mt-1">
        <iframe title="Contact-Me"
                className="wd-dark-filter" 
                src="https://docs.google.com/forms/d/e/1FAIpQLSeEdkHdyisoJIp9ISxMr8RUX6bsKc3DYxoumNkvUtQ0aiClVA/viewform?embedded=true" 
                width="640" 
                height="849" 
                frameborder="0" 
                marginheight="0" 
                marginwidth="0"><h1>Loading…</h1></iframe>
      </Row>
    </>
  );
}
export default Contact;