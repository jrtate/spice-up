import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { SignUpContainer } from "./styles";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <SignUpContainer padding={3}>
      <Typography sx={{ mb: 2 }} variant="h6">
        Sign Up
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
        <Link to="/login">
          <Button onClick={() => {}}>Back</Button>
        </Link>
        <LoadingButton
          loading={false}
          onClick={() => {}}
          disabled={!email || !password}
        >
          Sign Up
        </LoadingButton>
      </Box>
    </SignUpContainer>
  );
};

export default SignUp;
