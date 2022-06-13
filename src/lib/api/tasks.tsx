import client from "./client";
import { TaskData } from "../../interfaces";

//GET tasks
export const getTasks = () => {
  return client.get("tasks");
};

export const deleteTask = (id: string) => {
  return client.delete(`tasks/${id}`);
};

export const patchTask = (id: number, data: Object) => {
  return client.patch(`tasks/${id}`, data);
};

export const postTask = (data: Object) => {
  return client.post("tasks", data);
};

export const getATask = (id: number) => {
  return client.get(`tasks/${id}`);
};
