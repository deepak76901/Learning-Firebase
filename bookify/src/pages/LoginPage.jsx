import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function () {
  const firebase = useFirebase();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect( () => {
    if(firebase.isLoggedIn) navigate("/")

  },[firebase,navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing in user ...");
    const user = await firebase.signinEmailAndPassword(email, password);
    console.log("Signing in Succesfull");
  };

  const handleOAuth = async (e) => {
    console.log("Signing in ...");
    const result = await firebase.signinWithGoogle();
    console.log("Successfull : ", result);
  };
  return (
    <div className="container mt-5">
      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h3>or</h3>
      <Button variant="danger" onClick={handleOAuth}>
        Sign in with Google
      </Button>
    </div>
  );
}
