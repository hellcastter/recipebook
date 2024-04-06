import 'react';

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
                        <li><a href="#home">Home</a></li>
                        <li><a href="#recipes">Recipes</a></li>
                        <li><a href="#about">Calorie counter</a></li>
                        <li><a href="#about">Login</a></li>
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;