import { useEffect, useState } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import NavList from "../NavList";
import ListGroup from 'react-bootstrap/ListGroup';
import webScrap from "../../scripts/webScrap";
import { MAX_TITLE_LENGTH } from "../../constants/constants";
import "../../styles/tumblr.css"
import { LoaderPinwheelIcon } from "lucide-react";
import { API_URL } from "../../constants/constants";
import multiSnackBar from "../../scripts/multiSnackBar";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


import { error } from "jquery";

function Tumblr(){
    const [tumblrUsername, setTumblrUsername] = useState("");
    const [generate, setGenerate] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [snackBarTexts, setSnackBarTexts] = useState([])
    var [posts, setPosts] = useState([]);
    const handleChange = (e) => {
        setTumblrUsername(e.target.value)
    }
    const handleGetPost = () => {
        setGenerate(!generate)
    }

    const handleCloseSnackBar = (e, reason) => {
        if (reason === 'clickaway') return
        setSnackBarOpen(false);
        setSnackBarTexts(snackBarTexts.slice(1))
    };

    useEffect(() => {
        const getData = async () => {
            try {
                if (tumblrUsername && generate) {
                    setGenerate(false)
                    setSnackBarOpen(true)
                    console.log("making call")
                    const res = await fetch(`${API_URL}${tumblrUsername}`)
                    const json = await res.json()
                    console.log(generate)
                    console.log(json)
                    setPosts(json)
                } else {
                    if (tumblrUsername !== "") console.log("Waiting on another API call first >.<")
                }
                throw error
            } catch (error) {
                try{
                    setSnackBarOpen(true)
                    console.log(`Error getting https://www.tumblr.com/${tumblrUsername}`, error)
                    console.log(`Trying a different website: https://${tumblrUsername}.tumblr.com/`)
                    setSnackBarTexts([...snackBarTexts, `Error getting https://www.tumblr.com/${tumblrUsername}`])
                    setSnackBarTexts([...snackBarTexts, `Trying a different website: https://${tumblrUsername}.tumblr.com/`])
                    //await webScrap(`https://${tumblrUsername}.tumblr.com/`)
                    //        .then((data) => setPosts(data))
                } catch (error) {
                    console.log(`Error getting https://${tumblrUsername}.tumblr.com/`, error)
                    setSnackBarTexts([...snackBarTexts, `Error getting https://${tumblrUsername}.tumblr.com/`])
                }
            }
        }
        getData()
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
                            const body = post["bodys"][_i]
                            // Issue with not getting correct count, line breaks are gone... help
                            var wordCount = 0
                            if (body !== undefined) wordCount = body.trim().split(/\s+/).filter(word => word !== "").length
                            userAndWordCount[user] = userAndWordCount[user] + wordCount | wordCount
                        })
                        if (userAndWordCount.length !== 0) {
                            var wordCountComp = '';
                            for (const user in userAndWordCount) {
                                wordCountComp = wordCountComp + "\n" + user + "'s Word count: " + userAndWordCount[user]
                            }
                            var date = ""
                            if (post["dates"].length !== 0) {
                                (post["dates"][0].length === 1) ? date = post["dates"] : date = post["dates"][0]
                            } 
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
            {multiSnackBar(snackBarTexts, snackBarOpen, handleCloseSnackBar)}
        </>
    );
} export default Tumblr