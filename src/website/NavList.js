import { HashLink } from 'react-router-hash-link';
import ListGroup from 'react-bootstrap/ListGroup';
import { useWindowDimensions } from '../scripts/windowFunctions';
import { MIN_NAV_LIST_WIDTH } from '../constants/constants';

function NavList(links, widthMin = MIN_NAV_LIST_WIDTH) {
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