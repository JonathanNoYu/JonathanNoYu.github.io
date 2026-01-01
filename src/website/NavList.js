import { HashLink } from 'react-router-hash-link';
import ListGroup from 'react-bootstrap/ListGroup';
import { useWindowDimensions } from '../scripts/windowFunctions';

function NavList(links, widthMin = 1000) {
    const { width } = useWindowDimensions();
    if (width > widthMin) {
        return (
        <ul className="wd-gen-nav list-group">
            <ListGroup id={`page-nav`}>
                {links.map((link) => (
                    <ListGroup key={link}>
                        <HashLink
                            id={`HashLink${link}`}
                            to={`#${link}`}
                            className={`list-group-item rounded-0 bg-transparent text-secondary`}>
                            {link}
                        </HashLink>
                    </ListGroup>
                ))}
            </ListGroup>
        </ul>
        );
    }
} export default NavList