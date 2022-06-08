import client from "./client";

//GET tasks
export const getTasks = (session_id: string) => {
  return client.get("tasks");
};
