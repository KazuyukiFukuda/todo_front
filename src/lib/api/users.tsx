import client from "./client";

export const me = () => {
  return client.get("me");
};
