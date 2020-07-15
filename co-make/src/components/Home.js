import React from "react";
import failure from "../images/failure.jpg";
import success from "../images/success.jpg";
import dlt from "../images/Delete Confirmation.svg";
import download from "../images/Downloading.svg";
import done from "../images/Done.svg";

import "./styling/index.css";

const Home = () => {
  return (
    <div>
      <section className="main-section">
        <h1>Get involved in your community</h1>
        <h2>Make your voice heard on the issues you care about.</h2>
        <a href="https://front-end-ten-omega.now.sh/">Sign up</a>
      </section>

      <section className="failure-section">
        <div className="failure-img">
          <img src={failure} alt="failure" />
        </div>
        <div className="failure-content">
          <h3>No one listening?</h3>
          <p>
            Ever get frustated that a problem in your town or neighborhood goes
            ages without being resolved? You might have road issues (potholes,
            dangerous areas), overgrown plants, or anything else that makes
            living where you live a little less pleasant.
          </p>
        </div>
      </section>

      <section className="success-section">
        <div className="success-img">
          <img src={success} alt="success" />
        </div>
        <div className="success-content">
          <h3>Change that together</h3>
          <p>
            Co-Make helps you spread awareness of issues in your community for
            your local government to see and prioritize.
          </p>
        </div>
      </section>

      {/* <!-- How it works Section starts --> */}
      <section className="how-it-works-section">
        <div className="box">
          <img src={dlt} alt="describe problem" />
          <h3>Describe the problem</h3>
          <p>
            Be as specific as possible. This will help other community members
            become aware of what's going on and support you.
          </p>
        </div>
        <div className="box">
          <img src={download} alt="upvote issues" />
          <h3>Upvote important issues</h3>
          <p>
            Browse through every issue submitted by your community and upvote
            the ones you'd like to see solved first by your government.
          </p>
        </div>
        <div className="box">
          <img src={done} alt="government priority" />
          <h3>Pat yourself on the back</h3>
          <p>
            See real change in your community. Get rewards for being a positive
            community member in the form of points, freebies and local
            recognition.
          </p>
        </div>
      </section>
      {/* <!-- How it works Section ends --> */}

      {/* <!-- Sign up Section starts --> */}
      <section className="sign-up-section">
        <h2>Make your voice heard on the issues you care about.</h2>
        <a href="https://front-end-ten-omega.now.sh/">Sign up</a>
      </section>
      {/* <!-- Sign up Section ends --> */}
    </div>
  );
};

export default Home;
