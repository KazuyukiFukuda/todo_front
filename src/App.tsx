import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
//components
import Auth from "./components/Auth";
import Feed from "./components/Feed";
//function
import { signOut, signUp } from "./lib/api/auth";
import { SignUpData } from "./interfaces";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { me } from "./lib/api/users";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id === "") {
      console.log("user id is nothing");
      me().then((res) => {
        dispatch(
          login({
            id: res.data.id,
            display_name: res.data.display_name,
            email: res.data.email,
          })
        );
      });
    }
    console.log(user);
  }, [user.id]);

  return <>{user.id ? <Feed></Feed> : <Auth></Auth>}</>;
};

export default App;
