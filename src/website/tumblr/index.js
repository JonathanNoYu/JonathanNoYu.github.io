import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import NavList from "../NavList";
import axios from "axios";

function Tumblr(){
    const [tumblrUsername, setTumblrUsername] = useState("");

    const handleChange = (e) => {
        setTumblrUsername(e.target.value)
        console.log(tumblrUsername)
    }
    const fetch_posts = () => {
        axios.get()
    }
    return(
        <>
            <Container className="my-5">
                <Form.Control
                    placeholder="Tumblr Username"
                    aria-label="Tumblr Username"
                    aria-describedby="Tumblr Username"
                    onChange={handleChange}>
                </Form.Control>
                <Form.Control>
                    
                </Form.Control>
            </Container>
        </>
    );
} export default Tumblr