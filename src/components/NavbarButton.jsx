import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavbarButton = ({ text, path, children, className }) => {
    return (
        <Link to={path}>
            <Button variant="navbar" className={className}>
                {children}
                <p className=" text-xs">{text}</p>
            </Button>
        </Link>
    );
};
NavbarButton.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string,
    children: PropTypes.element.isRequired,
    className: PropTypes.string
}

export default NavbarButton