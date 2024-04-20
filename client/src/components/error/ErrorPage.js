import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css"

function ErrorPage() {
  return (
    <div className="error__page">
      <section>
        <p>Page Not Found</p>
        <Link>
          <button className="error__page__button">Home Page</button>
        </Link>
      </section>
    </div>
  );
}

export default ErrorPage;
