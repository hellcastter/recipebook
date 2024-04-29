import 'react';

import Container from '../container/Container.jsx';

import logo from '../../assets/logo.png';
import './Footer.css';
import {Link} from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "../../contexts.js";

function Footer() {
    const {user, setUser} = useContext(UserContext);

    return (
        <footer className="footer__container">
            <Container>
                <div className="footer__container">
                    <Link to="/" className="footer__logo">
                        <img src={logo} width={50} alt="Recipe book"/>
                        recipebook
                    </Link>

                    <nav className="footer__nav">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/recipes">Recipes</Link></li>

                            {
                                user ?
                                    <li><Link onClick={() => setUser(null)}>Logout</Link></li> :
                                    <li><Link to="/login">Login</Link></li>
                            }
                        </ul>
                    </nav>
                </div>

                <div className="footer__copy">
                    &copy; {new Date().getFullYear()} Recipebook
                </div>
            </Container>
        </footer>
    );
}

export default Footer;