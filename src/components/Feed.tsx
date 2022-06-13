import React, {
  useEffect,
  useState,
  createContext,
  SetStateAction,
} from "react";
import { TaskData } from "../interfaces";
import { getTasks } from "../lib/api/tasks";
import { selectUser, login, logout } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { format, getDate } from "date-fns";
//import { PageStatus } from "../interfaces";

import Task from "./Task";
import Header from "./Header";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import { Button } from "@material-ui/core";
import { render } from "@testing-library/react";
import EditProfile from "./EditProfile";

export const enum PageStatus {
  FEED = "feed",
  EDITPROFILE = "editing profile",
  CREATETASK = "creating task",
  EDITINGTASK = "editing task",
}

export const pageStatusContext = createContext<PageStatus>(PageStatus.FEED);
export const setPageStateContext = createContext<
  React.Dispatch<SetStateAction<PageStatus>>
>(() => undefined);

export const editingTaskIdContext = createContext<number>(1);
export const setEditingTaskIdContext = createContext<
  React.Dispatch<SetStateAction<number>>
>(() => undefined);

const Feed: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([
    {
      task_id: "",
      name: "",
      deadline: "",
      create_user: "",
      assignee_user: "",
      public: false,
      completed: false,
      total_subtask_amount: "",
      finished_subtask_amount: "",
    },
  ]);

  const [pageState, setPageState] = React.useState<PageStatus>(PageStatus.FEED);
  const [editingTaskId, setEditingTaskId] = React.useState<number>(0);

  useEffect(() => {
    console.log("get tasks");
    const unSub = () => {
      getTasks()
        .then(function (response) {
          setTasks(response.data.message);
        })
        .catch(function (error) {
          alert(error);
        });
    };
    return () => {
      unSub();
    };
  }, [pageState]);

  const createTaskButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPageState(PageStatus.CREATETASK);
    console.log(pageState);
  };

  return (
    <pageStatusContext.Provider value={pageState}>
      <setPageStateContext.Provider value={setPageState}>
        <Header />

        {pageState === PageStatus.FEED && (
          <div>
            <div style={{ margin: "10px 40px", textAlign: "right" }}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={createTaskButtonHandler}
              >
                新規タスクを作成
              </Button>
            </div>
            {tasks[0]?.task_id && (
              <setEditingTaskIdContext.Provider value={setEditingTaskId}>
                {tasks.map((task) => (
                  <Task
                    task_id={task.task_id}
                    name={task.name}
                    deadline={task.deadline}
                    create_user={task.create_user}
                    assignee_user={task.assignee_user}
                    public={task.public}
                    completed={task.completed}
                    total_subtask_amount={task.finished_subtask_amount}
                    finished_subtask_amount={task.finished_subtask_amount}
                  />
                ))}
              </setEditingTaskIdContext.Provider>
            )}
          </div>
        )}
        {pageState === PageStatus.EDITINGTASK && (
          <editingTaskIdContext.Provider value={editingTaskId}>
            <EditTask />
          </editingTaskIdContext.Provider>
        )}

        {pageState === PageStatus.CREATETASK && <CreateTask />}
        {pageState === PageStatus.EDITPROFILE && <EditProfile />}
      </setPageStateContext.Provider>
    </pageStatusContext.Provider>
  );
};
export default Feed;
