import {useContext} from "react";
import {Link} from 'react-router-dom';

import Container from '../container/Container.jsx';
import Search from '../search_component/Search.jsx';

import {UserContext} from "../../contexts.js";

import logo from '../../assets/logo.png';

import './Header.css';

const Header = () => {
    const {user, setUser} = useContext(UserContext);

    return (
        <header className="header">
            <Container className="header__container">
                <Link to="/" className="header__logo">
                    <img src={logo} alt="Recipe book"/>
                    recipebook
                </Link>


                <nav className="header__nav">
                    <ul>
                        <Search/>
                        <li><Link to="/">Home</Link></li>

                        {
                            user ?
                                <>
                                    <li><Link to="/recipes">My Recipes</Link></li>
                                    <li><Link to="/add">Add Recipe</Link></li>
                                    <li><Link onClick={() => setUser(null)} to="/">Logout</Link></li>
                                </> :
                                <li><Link to="/login">Login</Link></li>
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    );
};

export default Header;