import React, { useEffect } from "react";
import "./App.css";
//components
import Auth from "./components/Auth";
import Feed from "./components/Feed";
//function

import { useSelector, useDispatch } from "react-redux";
import { selectUser, login } from "./features/userSlice";
import { me } from "./lib/api/users";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id === "") {
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
  }, [user.id]);

  return <>{user.id ? <Feed></Feed> : <Auth></Auth>}</>;
};

export default App;
