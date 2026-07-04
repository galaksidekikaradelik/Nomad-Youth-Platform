import { Link } from "react-router-dom";
import "../style/pages/auth.css";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to continue your journey.
        </p>

        <form>

          <div className="auth-group">
            <label>Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-group">
            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button className="auth-button">
            Sign In
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?
          {" "}
          <Link className="auth-link" to="/register">
            Create one
          </Link>
        </div>

      </div>
    </div>
  );
}