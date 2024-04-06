import 'react';

import Container from '../container/Container.jsx';

import logo from '../../assets/logo.png';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <Container className="footer__container">
                <div className="footer__logo">
                    <img src={logo} width={50} alt="Recipe book"/>
                    recipebook
                </div>

                <nav className="footer__nav">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#recipes">Recipes</a></li>
                        <li><a href="#about">Calorie counter</a></li>
                        <li><a href="#about">Login</a></li>
                    </ul>
                </nav>
            </Container>
        </footer>
    );
}

export default Footer;