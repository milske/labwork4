import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { firebaseAuth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

const Input = styled.input`
  background-color: #5c5f63a3;
  border: none;
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: 0.3rem;
  color: white;

  &:focus {
    outline: 1px solid;
    outline-color: #f57c00;
    -moz-outline-radius: 0.3rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #f57c00;
  border: none;
  color: white;
  padding: 0.7rem 2rem;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  text-transform: uppercase;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #ffa000;
  }
`;

const ErrorMessage = styled.div`
  color: #ff1744;
`;

const SuccessMessage = styled.div`
  color: #00e676;
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await sendPasswordResetEmail(firebaseAuth, email);
      setMessage("We sent you an reset password email");
      navigate("/");
    } catch (error) {
      setError("Failed to reset password");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Section>
      <div className="container">
        <h1>Password Reset</h1>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {message && <SuccessMessage>{message}</SuccessMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton disabled={loading} type="submit">
            Reset Password
          </SubmitButton>
        </form>
        <div className="button">
          <span>
            Remember your password? <Link to="/login">Log In</Link>
          </span>
          <span>
            Need an account? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
  .container {
    height: 50vh;
    width: 25vw;
    background-color: #2c384a;
    border-radius: 1rem;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    input {
      background-color: #5c5f63a3;
      border: none;
      font-size: 1.2rem;
      padding: 1rem;
      border-radius: 0.3rem;
      color: white;
      &:focus {
        outline: 1px solid;
        outline-color: #f57c00;
        -moz-outline-radius: 0.3rem;
      }
    }
    .button {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      a {
        color: #039be5;
        text-decoration: none;
      }
      button {
        background-color: #f57c00;
        border: none;
        color: white;
        padding: 0.5rem 2rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        text-transform: uppercase;
        &:hover {
          background-color: #ffa000;
        }
      }
    }
  }
`;
