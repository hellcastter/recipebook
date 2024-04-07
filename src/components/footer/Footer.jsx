import 'react';

import Container from '../container/Container.jsx';

import logo from '../../assets/logo.png';
import './Footer.css';
import { Link } from 'react-router-dom';

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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Recipes">Recipes</Link></li>
                        <li><Link to="/CalorieCounter">Calorie counter</Link></li>
                        <li><Link to="/Login">Login</Link></li>
                    </ul>
                </nav>

                <div className="Links"></div>
            </Container>
        </footer>
    );
}

export default Footer;