import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Container from '../components/container/Container';

function PageLayout() {
  return (
    <main className="page">
      <Container>
        <Header />
        <Outlet />
      </Container>
      <Footer />
    </main>
  );
}

export default PageLayout;
