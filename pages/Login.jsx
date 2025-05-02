import React, { useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { loginUser } from "../utilities/loginUser";
import imageUrl from "/assets/images/avatar-icon.svg";

export function loginLoader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function loginActionSubmit({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = await loginUser({ email, password });
  if (data.user) {
    localStorage.setItem("loggedin", true);
    return redirect("/host");
  }
  return null;
}

export default function LoginPage() {
  const message = useLoaderData();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  return (
    <div className="login-container">
      {localStorage.getItem("loggedin") ? (
        <>
          <img src={imageUrl} width={200} style={{ marginBlockEnd: "50px" }} />
          <button
            style={{
              width: "20%",
              marginBlock: "auto",
              backgroundColor: "#ff8c38",
              color: "white",
              textTransform: "capitalize",
              padding: "20px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              borderRadius: "10px",
            }}
            onClick={() => {
              localStorage.removeItem("loggedin");
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>Sign in to your account</h1>
          {error && <h3 style={{ color: "red" }}>{error.message}</h3>}
          {message && <h3 style={{ color: "red" }}>{message}</h3>}
          <Form method="POST" className="login-form">
            <input name="email" type="email" placeholder="Email address" />
            <input name="password" type="password" placeholder="Password" />
            <button
              style={{
                cursor: status === "submitting" ? "not-allowed" : "pointer",
              }}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Logging in..." : "Log in"}
            </button>
          </Form>
        </>
      )}
    </div>
  );
}
