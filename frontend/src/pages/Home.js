import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.userAuth);

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        {isAuthenticated ? (
          <>
            <h1 className="display-4">Welcome to MERN Auth App</h1>
            <hr className="my-4" />
            <p className="lead">Welcome to the Dashboard</p>
          </>
        ) : (
          <>
            <h1 className="display-4">Welcome to MERN Auth App</h1>
            <hr className="my-4" />
            <p className="lead">Please Login to continue</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
