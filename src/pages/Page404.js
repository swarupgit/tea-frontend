import { Link, Link as RouterLink } from "react-router-dom";
import errorImage from "../assets/404.png";

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <div style={{ padding: "10vh" }}>
      <div>
        <img src={errorImage} className="error-404" alt="404 error" />
        <span style={{ fontSize: "36px" }}>Page not found</span>
      </div>
      <Link component={RouterLink} to="/" size="large" variant="contained">
        Back to Home
      </Link>
    </div>
  );
}
