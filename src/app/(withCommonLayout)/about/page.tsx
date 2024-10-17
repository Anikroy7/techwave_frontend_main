// pages/about.js

import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto py-10">
      
      <div className="mb-10">
        <h2 className="text-center text-3xl mb-2">Our Mission</h2>
        <p className="text-center text-lg max-w-2xl mx-auto">
          Our mission is to empower individuals and organizations through innovative technology solutions that enhance productivity and foster collaboration.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-center text-3xl mb-2">Our Vision</h2>
        <p className="text-center text-lg max-w-2xl mx-auto">
          We envision a world where technology bridges gaps, connects communities, and creates endless possibilities for growth and development.
        </p>
      </div>

      <h2 className="text-center text-3xl mb-6">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className=" shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
          <h3 className="text-center text-lg font-semibold">John Doe</h3>
          <p className="text-center">CEO & Founder</p>
          <p className="text-center mt-2">
            John has over 10 years of experience in the tech industry and is passionate about driving innovation.
          </p>
        </div>

        <div className=" shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
          <h3 className="text-center text-lg font-semibold">Jane Smith</h3>
          <p className="text-center">CTO</p>
          <p className="text-center mt-2">
            Jane leads our technical team with a focus on developing cutting-edge solutions.
          </p>
        </div>

        <div className=" shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
          <h3 className="text-center text-lg font-semibold">Emily Johnson</h3>
          <p className="text-center">Marketing Director</p>
          <p className="text-center mt-2">
            Emily is responsible for crafting our brand message and engaging our community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
