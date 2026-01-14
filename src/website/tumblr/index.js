import { useEffect, useState } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import NavList from "../NavList";
import ListGroup from 'react-bootstrap/ListGroup';
import webScrap from "../../scripts/webScrap";
import { MAX_TITLE_LENGTH } from "../../constants/constants";
import "../../styles/tumblr.css"
import { LoaderPinwheelIcon } from "lucide-react";
import { API_URL } from "../../constants/constants";

function Tumblr(){
    const [tumblrUsername, setTumblrUsername] = useState("");
    const [generate, setGenerate] = useState(false);
    var [posts, setPosts] = useState([]);
    const handleChange = (e) => {
        setTumblrUsername(e.target.value)
    }
    const handleGetPost = () => {
        setGenerate(!generate)
    }


    useEffect(() => {
        const getData = async () => {
            try {
                if (tumblrUsername && generate) {
                    console.log("making call")
                    const res = await fetch(`${API_URL}${tumblrUsername}`)
                    const json = await res.json()
                    console.log(json)
                    setPosts(json)
                }
            } catch (error) {
                try{
                    console.log(`Error getting https://www.tumblr.com/${tumblrUsername}`, error)
                    console.log(`Trying a different website: https://${tumblrUsername}.tumblr.com/`)
                    await webScrap(`https://${tumblrUsername}.tumblr.com/`)
                            .then((data) => setPosts(data))
                } catch (error) {
                    console.log(`Error getting https://${tumblrUsername}.tumblr.com/`, error)
                }
            }
        }
        getData()
        setGenerate(false)
    }, [generate])

    const PostComp = () => {
        if (posts.length > 0) {
            return (<Row>
                <ListGroup className="col wd-post-titles-authors">
                    {posts.map((post) => {
                        var newTitle = post["title"]
                        if (newTitle !== undefined && newTitle.length >= MAX_TITLE_LENGTH) {
                            newTitle = newTitle.substring(0, MAX_TITLE_LENGTH) + "..."
                        }
                        var userAndWordCount = {}
                        post["users"].map((user, _i) => {
                            var body = ""
                            if (post["bodys"].length < _i) body = post["bodys"][_i]
                            // Issue with not getting correct count, line breaks are gone... help
                            var wordCount = body.trim().split(/\s+/).filter(word => word !== "").length
                            userAndWordCount[user] = userAndWordCount[user] + wordCount | wordCount
                        })
                        if (userAndWordCount.length !== 0) {
                            var wordCountComp = '';
                            for (const user in userAndWordCount) {
                                wordCountComp = wordCountComp + "\n" + user + "'s Word count: " + userAndWordCount[user]
                            }
                            var date = post["dates"][0]
                            if (date === "p") date = post["dates"]
                            return(<ListGroup.Item className="" id={post["id"]}>
                                        <p className="wd-new-line border-bottom border-primary">Title: {newTitle}</p>
                                        <p className="wd-new-line border-bottom border-primary">Subtitle: {post["subtitle"]}</p>
                                        <p className="wd-new-line border-bottom border-primary">{date}</p>
                                        <p className="wd-new-line border-bottom border-primary">Author: {post["author"]}</p>
                                        <p className="wd-new-line">{wordCountComp}</p>
                                    </ListGroup.Item>) 
                        } else {
                            return(<ListGroup.Item className="" id={post["id"]}>Title:{newTitle} Author:{post["author"]}</ListGroup.Item>)
                        }
                    })}
                </ListGroup>
                <Col className="p-0">
                    {posts.map((post, __i) => {
                        var newTitle = post["title"]
                        if (newTitle !== undefined && newTitle.length >= MAX_TITLE_LENGTH) {
                            newTitle = newTitle.substring(0, MAX_TITLE_LENGTH) + "..."
                        }
                        var link = newTitle
                        if (post["links"] && post["links"].length <= __i + 1) link = post["links"][__i + 1]
                        return(<>
                            <h4 id={`${link}`} className="text-white">{newTitle}</h4>
                            {post["users"].map((user, _i) => {
                                var body = ""
                                if (post["bodys"].length < _i) body = post["bodys"][_i]
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
                <Row>
                    <Form.Control
                        placeholder="Tumblr Username"
                        aria-label="Tumblr Username"
                        aria-describedby="Tumblr Username"
                        className="col w-25"
                        onChange={handleChange}>
                    </Form.Control>
                    <Button className="col-4" onClick={handleGetPost}>Search!</Button>
                </Row>
                <Row>
                    <PostComp />
                </Row>
            </Container>

        </>
    );
} export default Tumblr