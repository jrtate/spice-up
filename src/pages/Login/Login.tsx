import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LoginContainer } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/AuthApi";
import { useToast } from "../../hooks/Toast";

const Login = () => {
  const navigate = useNavigate();
  const { handleSetShowToast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useLoginMutation(navigate, handleSetShowToast);

  return (
    <LoginContainer padding={3}>
      <Typography sx={{ mb: 2 }} variant="h6">
        Login
      </Typography>

      <TextField
        label="Email"
        variant="standard"
        value={email}
        type="email"
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
        <Link to="/signup">
          <Button onClick={() => {}}>New User? Sign up here!</Button>
        </Link>
        <LoadingButton
          loading={false}
          onClick={() => login.mutate({ email, password })}
          disabled={!email || !password}
        >
          Login
        </LoadingButton>
      </Box>
    </LoginContainer>
  );
};

export default Login;
