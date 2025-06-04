import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./website/home";
import Contact from "./website/contact";
import Gallery from "./website/gallery";
import Tasks from "./website/tasks"
import NavBar from "./NavBar";
import "./styles/gen-styles.css"

function App() {
   return (
      <HashRouter>
         <NavBar />
         <div className="wd-nav-padding">
            <Routes>
               <Route path="/*" element={<Home />} />
               <Route path="/home" element={<Home />} />
               {/* <Route path="/about" element={<div>About</div>} />
               <Route path="/blogs" element={<div>Blogs</div>} /> */}
               <Route path="/tasks" element={<Tasks />} />
               <Route path="/gallery" element={<Gallery />} />
               <Route path="/contact" element={<Contact />} />
            </Routes>
         </div>
      </HashRouter>
   );
}
export default App;
