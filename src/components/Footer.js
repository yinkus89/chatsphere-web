import React from "react";
import "../styles/styles.css"; // Ensure styles are imported

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} ChatSphere. All rights reserved.
        </p>
        <p>
          <a href="/about">About Us</a> |<a href="/contact">Contact</a> |
          <a href="/privacy">Privacy Policy</a>
          Visit our API documentation at{" "}
          <a
            href="https://virtserver.swaggerhub.com/YINKAWLB/chatterbox1/1.0.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            SwaggerHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
