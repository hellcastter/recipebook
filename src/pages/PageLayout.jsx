import {Outlet} from "react-router-dom";

import Footer from "../components/footer/Footer.jsx";
import Header from "../components/header/Header.jsx";
import Container from "../components/container/Container.jsx";

const PageLayout = () => (
    <main className="page">
        <Container>
            <Header/>
            <Outlet/>
        </Container>
        <Footer/>
    </main>
);

export default PageLayout;