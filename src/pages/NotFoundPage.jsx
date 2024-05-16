import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <h1>Wrong page bro</h1>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFoundPage;
