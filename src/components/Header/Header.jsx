import logo from '../../assets/logo/InStock-Logo.svg';
import { Link , NavLink } from "react-router-dom";
import './Header.scss'


function Header() {
    return (
        <header className="header">
            <Link to="/" className="header__logo"><img src={logo} alt="logo"/></Link>
            <nav className="header__nav">
                <NavLink to="/" className='header__nav__item'>Warehouse</NavLink>
                <NavLink to="/inventory" className='header__nav__item'>Inventory</NavLink>
            </nav>
        </header>
    )
}

export default Header;