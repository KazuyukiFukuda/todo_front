import client from "./client";
import { TaskData } from "../../interfaces";

//GET tasks
export const getTasks = () => {
  return client.get("tasks");
};

export const deleteTask = (id: string) => {
  return client.delete(`tasks/${id}`);
};

export const postTask = (data: Object) => {
  return client.post("tasks", data);
};
