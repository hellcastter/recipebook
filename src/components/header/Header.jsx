import 'react';
import { Link } from 'react-router-dom';

import Container from '../container/Container.jsx';

import logo from '../../assets/logo.png';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <Container className="header__container">
                <div className="header__logo">
                    <img src={logo} alt="Recipe book"/>
                    recipebook
                </div>

                <nav className="header__nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Recipes">Recipes</Link></li>
                        <li><Link to="/CalorieCounter">Calorie counter</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;