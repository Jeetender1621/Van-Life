import React from "react";
import { useLoaderData } from "react-router-dom";
import { loginUser } from "../utilities/loginUser";

export function loginLoader({ request }) {
  return new URL(request.url).searchParams.get("message");
}
export default function LoginPage() {
  const message = useLoaderData();
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    loginUser(loginFormData)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
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
        <button style={{ cursor: "pointer" }}>Log in</button>
      </form>
    </div>
  );
}
