import React, { useEffect, useState } from "react";
import { TaskData } from "../interfaces";
import { getTasks } from "../lib/api/tasks";
import { selectUser, login, logout } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

import Task from "./Task";
import Header from "./Header";

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
  const user = useSelector(selectUser);

  useEffect(() => {
    const unSub = () => {
      getTasks(user.id)
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
  }, []);
  console.log(tasks);

  return (
    <div>
      <Header></Header>
      {tasks[0]?.task_id && (
        <>
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
            ></Task>
          ))}
        </>
      )}
    </div>
  );
};
export default Feed;
