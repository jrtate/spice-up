import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SignUpContainer } from "./styles";
import { useSignUpMutation } from "api/AuthApi";
import { useToast } from "../../hooks/useToast";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSetShowToast } = useToast();
  const signUp = useSignUpMutation(navigate, handleSetShowToast);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signUp.mutate({ email, password });
      }}
    >
      <SignUpContainer padding={3}>
        <Typography sx={{ mb: 2 }} variant="h6">
          Sign Up
        </Typography>

        <TextField
          label="Email"
          variant="standard"
          value={email}
          // type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          sx={{ mt: 1 }}
          label="Password"
          variant="standard"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={3}>
          <Link to="/login">
            <Button onClick={() => {}}>Back</Button>
          </Link>
          <Button type="submit" disabled={!email || !password}>
            Sign Up
          </Button>
        </Box>
      </SignUpContainer>
    </form>
  );
};

export default SignUp;
