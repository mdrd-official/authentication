import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to Video Subtitles App</h1>
        <p className="lead">
          Manage and organize your videos with ease. Add subtitles and enhance the viewing experience.
        </p>
        <hr className="my-4" />
        <p>
          This app provides a user-friendly interface for uploading, managing, and playing videos with custom subtitles.
        </p>
        <Link className="btn btn-primary btn-lg" to="/login" role="button">
          Get Started
        </Link>
      </div>

    </div>
  );
};

export default Home;
