import React from "react";
import logo from "./logo.svg";
import "./App.css";
//components
import Auth from "./components/Auth";
import TasksList from "./components/TaskList";
//function
import { signUp } from "./lib/api/auth";
import { SignUpData } from "./interfaces";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return <>{user.id ? <TasksList></TasksList> : <Auth></Auth>}</>;
};

export default App;
