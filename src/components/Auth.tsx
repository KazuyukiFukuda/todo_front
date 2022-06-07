import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, updateUserProfile } from "../features/userSlice";
import styles from "./Auth.module.css";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailIcon from "@material-ui/icons/Email";

import { SignUpData } from "../interfaces";
import { SignInData } from "../interfaces";
import { signIn, signUp } from "../lib/api/auth";
import { me } from "../lib/api/users";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "50vh",
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: "400",
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [display_name, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");

  const postSignUp = async () => {
    const data: SignUpData = {
      display_name: display_name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    try {
      const res = await signUp(data);
      if (res.status === 201) {
        const userData = await me();
        dispatch(
          login({
            id: userData.data.id,
            display_name: userData.data.display_name,
            email: userData.data.email,
          })
        );
      } else {
        alert(res.data);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const postSignIn = async () => {
    const data: SignInData = {
      email: email,
      password: password,
    };
    try {
      const res = await signIn(data);
      if (res.status === 201) {
        const userData = await me();
        dispatch(
          login({
            id: userData.data.id,
            display_name: userData.data.display_name,
            email: userData.data.email,
          })
        );
      } else {
        alert(res.data);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <Grid
        container
        alignItems="center"
        component="main"
        justify="center"
        className={classes.root}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          spacing={1}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? "Login" : "Sign up"}
            </Typography>
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="display name"
                  label="Display name"
                  autoComplete="display name"
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
              label="Email"
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
              label="Password"
              autoComplete="password"
              autoFocus
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password confirmation"
                  label="Password confirmation"
                  autoComplete="password confirmation"
                  autoFocus
                  value={password_confirmation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordConfirmation(e.target.value);
                  }}
                />
              </>
            )}
            <Grid item>
              <span
                className={styles.login_toggleMode}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create new account?" : "Back to login"}
              </span>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<EmailIcon />}
              onClick={
                isLogin
                  ? async () => {
                      try {
                        await postSignIn();
                      } catch (err: any) {
                        alert(err.message);
                      }
                    }
                  : async () => {
                      try {
                        await postSignUp();
                      } catch (err: any) {
                        alert(err.message);
                      }
                    }
              }
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Auth;
