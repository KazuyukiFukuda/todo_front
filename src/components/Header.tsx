import React, { useContext } from "react";
import { selectUser, logout } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../lib/api/auth";
import { setPageStateContext, PageStatus } from "./Feed";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";

import { Grid } from "@material-ui/core";

const useSetPageState = () => useContext(setPageStateContext);

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const setPageState = useSetPageState();

  const deleteSignOut = async () => {
    console.log("sign out するよ");
    await signOut()
      .then((res) => {
        if (res.status === 204) {
          dispatch(logout());
          console.log("200だよ");
        } else {
          alert(res.status);
          console.log("204以外を受け取った");
        }
      })
      .catch((res) => {
        alert(res.data.message);
        console.log("なんかエラー吐いたよ");
      });
    console.log("sign out したよ");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Button
                color="inherit"
                onClick={() => {
                  setPageState(PageStatus.FEED);
                }}
              >
                {user.display_name}
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="inherit"
                onClick={() => {
                  setPageState(PageStatus.EDITINGTASK);
                }}
              >
                プロフィール
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  deleteSignOut();
                }}
              >
                ログアウト
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
