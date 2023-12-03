import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { SignUpContainer } from "./styles";
import { useSignUpMutation } from "api/AuthApi";
import { useToast } from "../../hooks/useToast";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSetShowToast } = useToast();
  const signUp = useSignUpMutation(navigate, handleSetShowToast);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signUp.mutate({ email, password });
      }}
    >
      <SignUpContainer padding={3}>
        <Typography sx={{ mb: 3 }} variant="h6">
          Sign Up
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
          sx={{ mt: 1, mb: 2 }}
          label="Password"
          variant="standard"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital"]}
          minLength={8}
          value={password}
          valueAgain={password}
          onChange={(isValid) => {
            setIsValid(isValid);
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          mt={4}
        >
          <Link to="/login">
            <Button onClick={() => {}}>Back</Button>
          </Link>
          <Button type="submit" disabled={!isValid}>
            Sign Up
          </Button>
        </Box>
      </SignUpContainer>
    </form>
  );
};

export default SignUp;
