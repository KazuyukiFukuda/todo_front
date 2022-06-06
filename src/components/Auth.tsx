import React, { useState } from "react";
import { useCookies } from "react-cookie";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
} from "@material-ui/core";
import { SignUpData } from "../interfaces";
import { SignInData } from "../interfaces";
import { signIn, signUp } from "../lib/api/auth";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [display_name, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["_session_id"]);

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data: SignUpData = {
      display_name: display_name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    try {
      const res = await signUp(data);
      if (res.status === 201) {
        console.log("sign up");
      } else {
        alert(res.data);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const hadleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data: SignInData = {
      email: email,
      password: password,
    };
    try {
      const res = await signIn(data);
      if (res.status === 201) {
        console.log("sign in");
      } else {
        alert(res.data);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Grid container>
      {!isLogin && (
        <>
          <TextField
            disabled={isLogin}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="display_name"
            label="display name"
            autoComplete="display_name"
            autoFocus
            value={display_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDisplayName(e.target.value);
            }}
          />
        </>
      )}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        label="password"
        autoComplete="password"
        autoFocus
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      {!isLogin && (
        <TextField
          disabled={isLogin}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password_confirmation"
          label="password confirmation"
          autoComplete="password_confirmation"
          autoFocus
          value={password_confirmation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordConfirmation(e.target.value);
          }}
        />
      )}
      <Grid item>
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create new account?" : "Back to login"}
        </span>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={isLogin ? hadleSignIn : handleSignUp}
      >
        {isLogin ? "sign in" : "sign up"}
      </Button>
    </Grid>
  );
};
export default Auth;
