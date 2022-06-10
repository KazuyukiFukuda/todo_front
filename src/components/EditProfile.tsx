import React, { useState } from "react";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";

import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { patchUsers } from "../lib/api/users";

const samllTitleXS: number = 3;
const valueXS: number = 7;

const EditProfile: React.FC = () => {
  const user = useSelector(selectUser);

  const [displayName, setDisplayName] = useState<string>(user.display_name);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");

  const patchProfile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const data: Object =
      newPassword !== null
        ? {
            display_name: displayName,
            email: email,
            current_password: password,
          }
        : {
            display_name: displayName,
            email: email,
            current_password: password,
            password: newPassword,
            password_confirmation: newPasswordConfirmation,
          };
    patchUsers(user.id, data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Yeah");
        } else {
          console.log("boo");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ margin: "40px 0px 0px 40px" }}>
      <Grid container spacing={1}>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}></Grid>
          <Grid item xs={valueXS}>
            <Typography variant="h5">プロフィール編集</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>表示名</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="display name"
                autoFocus
                value={displayName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDisplayName(e.target.value);
                }}
              ></TextField>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>メールアドレス</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                autoFocus
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              ></TextField>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>現在のパスワード</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="current password"
                autoFocus
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              ></TextField>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>新しいパスワード</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="new password"
                autoFocus
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPassword(e.target.value);
                }}
              ></TextField>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>新しいパスワードの再入力</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="confirm new password"
                autoFocus
                value={newPasswordConfirmation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPasswordConfirmation(e.target.value);
                }}
              ></TextField>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Button
          variant="contained"
          color="success"
          disabled={password === undefined || password === ""}
          onClick={patchProfile}
        >
          保存
        </Button>
      </Grid>
    </Box>
  );
};

export default EditProfile;
