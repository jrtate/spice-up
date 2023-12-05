import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LoginContainer } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/AuthApi";
import { useToast } from "../../hooks/useToast";

const Login = () => {
  const navigate = useNavigate();
  const { handleSetShowToast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useLoginMutation(navigate, handleSetShowToast);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login.mutate({ email, password });
      }}
    >
      <LoginContainer padding={3}>
        <Typography sx={{ mb: 3 }} variant="h6">
          Login
        </Typography>

        <TextField
          autoFocus
          label="Email"
          variant="standard"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          sx={{ mt: 3 }}
          label="Password"
          variant="standard"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          mt={8}
        >
          <Link to="/signup">
            <Button onClick={() => {}}>New User? Sign up here!</Button>
          </Link>
          <LoadingButton
            type="submit"
            loading={login.isPending}
            disabled={!email || !password}
          >
            Login
          </LoadingButton>
        </Box>
      </LoginContainer>
    </form>
  );
};

export default Login;
