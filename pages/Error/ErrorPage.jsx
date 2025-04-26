import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error-container">
      <h1 className="error-title">
        Sorry, the page you were looking for was not found.
      </h1>
      <Link to="/" className="return-home">
        Return to home
      </Link>
    </div>
  );
}
