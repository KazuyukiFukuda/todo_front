import client from "./client";

export const me = () => {
  return client.get("me");
};

export const getUsers = () => {
  return client.get("users");
};

export const patchUsers = (id: string, data: object) => {
  return client.patch(`users/${id}`, data);
};
