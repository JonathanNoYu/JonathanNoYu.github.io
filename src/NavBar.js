import { Link, useLocation } from "react-router-dom";
import "../src/styles/nav-styles.css"
import { useWindowDimensions } from "./scripts/windowFunctions";
import { MOBILE_WIDTH } from "./constants/constants";

function NavBar() {
    const { pathname } = useLocation();
    const { width } = useWindowDimensions();
    let rightContent;
    if (width > MOBILE_WIDTH) {
        rightContent = <div className="right-side">
                {/* <Link to="/about"
                    className={`wd-nav-link px-2 py-0 ${pathname.includes("about") ? "active" : ""}`}>About</Link>
                <Link to="/blogs"
                    className={`wd-nav-link px-2 py-0 ${pathname.includes("blogs") ? "active" : ""}`}>Blogs</Link> */}
                {/* <Link to="/tasks"
                    className={`wd-nav-link px-2 py-0 ${pathname.includes("gallery") ? "active" : ""}`}>Tasks</Link> */}
                <Link to="/gallery"
                    className={`wd-nav-link px-2 py-0 ${pathname.includes("gallery") ? "active" : ""}`}>Gallery</Link>
                <Link to="/contact"
                    className={`wd-nav-link px-2 py-0 ${pathname.includes("contact") ? "active" : ""}`}>Contact</Link>
            </div>
    } else {
        rightContent = <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list text-white m-auto" viewBox="0 0 20 20"
            type="button" data-bs-toggle="modal" data-bs-target="#blurNav">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
        </div>
    }
    return (
        <>
            <nav className="nav-wrapper p-4">
                <div className="left-side">
                    <Link to="/home"
                        className={`wd-brand wd-nav-link px-2 py-0 font-weight-bold ${pathname.includes("home") ? "active" : ""}`}>JONATHAN YU</Link>
                </div>
                {rightContent}
            </nav>
            <div class="modal fade blur-bg" id="blurNav" data-bs-keyboard="false" tabindex="-1" aria-labelledby="blurNavLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content popup-nav">
                        <div class="modal-header wd-modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div type="button" className="d-flex flex-column" data-bs-dismiss="modal" aria-label="Close">
                            <Link to="/home"
                                    className={`wd-nav-link px-5 py-0`}> <h1>Home</h1></Link>
                            <Link to="/gallery"
                                className={`wd-nav-link px-5 py-0`}><h1>Gallery</h1></Link>
                            <Link to="/contact"
                                className={`wd-nav-link px-5 py-0`}><h1>Contact</h1></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NavBar;