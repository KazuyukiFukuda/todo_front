import client from "./client";
import { SignInData, SignUpData } from "../../interfaces";

//sign up
export const signUp = (data: SignUpData) => {
  return client.post("users", data);
};

//sign in
export const signIn = (data: SignInData) => {
  return client.post("auth", data);
};

//sign out
export const signOut = (session_id: any) => {
  return (
    client.delete("auth"),
    {
      headers: {
        _session_id: session_id,
      },
    }
  );
};
