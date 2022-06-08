import React from "react";
import { selectUser, login, logout } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../lib/api/auth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Item from "@mui/material";
import { Grid, MenuItem } from "@material-ui/core";

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {user.display_name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button color="inherit">プロフィール</Button>
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
