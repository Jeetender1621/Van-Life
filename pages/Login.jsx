import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { loginUser } from "../utilities/loginUser";

export function loginLoader({ request }) {
  return new URL(request.url).searchParams.get("message");
}
export default function LoginPage() {
  const message = useLoaderData();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    loginUser(loginFormData)
      .then((data) => {
        console.log(data);
        navigate("/host", { replace: true });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {error && <h3 style={{ color: "red" }}>{error.message}</h3>}
      {message && <h3 style={{ color: "red" }}>{message}</h3>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button
          style={{
            cursor: status === "submitting" ? "not-allowed" : "pointer",
          }}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
