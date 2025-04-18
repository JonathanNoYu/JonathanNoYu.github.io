import { HashLink } from 'react-router-hash-link';
import ListGroup from 'react-bootstrap/ListGroup';

function NavList(links) {
    return (
        <ul className="wd-gen-nav list-group">
            <ListGroup id={`page-nav`}>
                {links.map((link) => (
                    <ListGroup>
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

} export default NavList