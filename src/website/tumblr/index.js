import { useEffect, useState } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";
import NavList from "../NavList";
import ListGroup from 'react-bootstrap/ListGroup';
import webScrap from "../../scripts/webScrap";
import { MAX_TITLE_LENGTH } from "../../constants/constants";
import "../../styles/tumblr.css"

function Tumblr(){
    const [tumblrUsername, setTumblrUsername] = useState("");
    const [generate, setGenerate] = useState(false);
    var [posts, setPosts] = useState([]);
    // const posts = webScrap(`https://stormofembla.tumblr.com/`);
    const handleChange = (e) => {
        setTumblrUsername(e.target.value)
    }
    const handleGetPost = () => {
        setGenerate(!generate)
    }


    useEffect(() => {
        const getData = async () => {
            try {
                await webScrap(`https://${tumblrUsername}.tumblr.com/`)
                    .then((data) => setPosts(data))
                    .finally(console.log(posts))
            } catch (error) {
                console.log(`Error getting https://${tumblrUsername}.tumblr.com/`,error)
            }
            console.log(posts)
        }
        getData()
    }, [generate])

    const PostComp = () => {
        console.log(posts)
        if (posts !== undefined) {
            return (<Row>
                <ListGroup className="col wd-post-titles-authors">
                    {posts.map((post) => {
                        var newTitle = post["title"]
                        if (newTitle !== undefined && newTitle.length >= MAX_TITLE_LENGTH) {
                            newTitle = newTitle.substring(0, MAX_TITLE_LENGTH) + "..."
                        }
                        return(<ListGroup.Item className="" id={post["link"]}>Title:{newTitle} Author:{post["author"]}</ListGroup.Item>)
                    })}
                </ListGroup>
                <Col className="p-0">
                    {posts.map((post, __i) => {
                        var newTitle = post["title"]
                        if (newTitle !== undefined && newTitle.length >= MAX_TITLE_LENGTH) {
                            newTitle = newTitle.substring(0, MAX_TITLE_LENGTH) + "..."
                        }
                        return(<>
                            <h4 id={`post-${post["id"]}`} className="text-white">{newTitle}</h4>
                            {post["users"].map((user, _i) => {
                                const body = post["bodys"][_i]
                                return(<p className="post-text text-white">{user}: {body}</p>)
                            })}
                            </>
                        )
                    })}
                </Col>
            </Row>)
        }
    }

    return(
        <>
            <Container className="my-5">
                    <Form.Control
                        placeholder="Tumblr Username"
                        aria-label="Tumblr Username"
                        aria-describedby="Tumblr Username"
                        className="col-9"
                        onChange={handleChange}>
                    </Form.Control>
                    <Form.Control onClick={handleGetPost}>
                    </Form.Control>
                <Row>
                    <PostComp />
                </Row>
            </Container>

        </>
    );
} export default Tumblr