import './App.css'

import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Container from "../components/container/Container.jsx";
import LoginForm from "../components/forms/LoginForm.jsx"

const Login = () => {
    return (
        <>
            <Container>
                <Header />
                <LoginForm />
            </Container>
            <Footer />
        </>
    )
}

export default Login;