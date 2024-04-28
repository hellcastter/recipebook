import 'react';
import { Link } from 'react-router-dom';

import Container from '../container/Container.jsx';

import logo from '../../assets/logo.png';
import './Header.css';
import {useContext} from "react";
import {UserContext} from "../../contexts.js";
import Search from '../search_component/Search.jsx';

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
                        <Search />
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Recipes">Recipes</Link></li>
                        <li><Link to="/CalorieCounter">Calorie counter</Link></li>

                        {
                            user ?
                                <li><Link onClick={() => setUser(null)}>Logout</Link></li> :
                                <li><Link to="/Login">Login</Link></li>
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;