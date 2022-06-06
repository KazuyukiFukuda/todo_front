import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Auth from "./components/Auth";
import { signUp } from "./lib/api/auth";
import { SignUpData } from "./interfaces";

const App: React.FC = () => {
  return <Auth></Auth>;
};

export default App;
