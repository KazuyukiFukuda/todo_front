import React, { useState, useEffect, useContext } from "react";
import { getUsers } from "../lib/api/users";
import { patchTask, getATask } from "../lib/api/tasks";
import { UserData, SubtaskData, TaskData } from "../interfaces";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { editingTaskIdContext } from "./Feed";

import Grid from "@mui/material/Grid";
import { FormControl, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import { Button, Checkbox } from "@mui/material";

const samllTitleXS: number = 2;
const valueXS: number = 7;
const useEditingTaskId = () => useContext(editingTaskIdContext);

const EditTask: React.FC = () => {
  const [postData, setPostData] = useState<Object>({
    name: "",
    description: "",
    deadline: new Date(),
    assignee_email: "",
    public: "",
    subtasks: [],
  });
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | null>();
  const [publicState, setPublicState] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [subtasks, setSubtasks] = useState<SubtaskData[]>([
    {
      id: 0,
      description: "",
      completed: false,
    },
  ]);
  const [userList, setUserList] = useState<UserData[]>([
    {
      id: 0,
      email: "",
      display_name: "",
    },
  ]);
  const [task, setTask] = useState<Object>({
    completed: completed,
    name: name,
    description: description,
    deadline: deadline,
    assignee_id: assigneeId,
    public: publicState,
    subtasks: subtasks,
  });
  const taskId = useEditingTaskId();

  useEffect(() => {
    const unSub = () => {
      getUsers()
        .then(function (response) {
          setUserList(response.data.message);
        })
        .catch(function (error) {});
      getATask(taskId).then(function (response) {
        setName(response.data.message.name);
        setDescription(response.data.message.description);
        setDeadline(response.data.message.deadline);
        setPublicState(response.data.message.public);
        setCompleted(response.data.message.completed);
        setAssigneeId(response.data.message.assignee_id);
        setSubtasks(response.data.message.subtasks);
      });
    };
    return () => {
      unSub();
    };
  }, []);

  const deadlineHandler = (newDate: Date | null) => {
    setDeadline(newDate);
  };

  const publicStateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const state = (event.target as HTMLInputElement).value;
    if (state === "public") {
      setPublicState(true);
    } else if (state === "private") {
      setPublicState(false);
    }
    console.log(subtasks);
  };

  const assigneeEmailHandler = (event: SelectChangeEvent) => {
    setAssigneeId(event.target.value as string);
  };

  const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const subtasksAddHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSubtasks([
      ...subtasks,
      {
        id: (subtasks.length += 2),
        description: "",
        completed: false,
      },
    ]);
  };

  const subtaskEditHandler = (
    editId: number,
    newDescription: string | null,
    newCompleted: boolean | null
  ) => {
    console.log("subtask patch");
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === editId
          ? {
              id: subtask.id,
              description:
                newDescription === null ? subtask.description : newDescription,
              completed:
                newCompleted === null ? subtask.completed : newCompleted,
            }
          : subtask
      )
    );
  };

  const subtaskDeleteHandler = async (deleteId: number) => {
    console.log("delete subtask");
    setSubtasks(subtasks.filter((subtask, index) => subtask.id !== deleteId));
  };

  const editTask = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const data: Object = {
      completed: completed,
      name: name,
      description: description,
      deadline: "2023-04-02",
      assignee_id: assigneeId,
      public: publicState,
      subtasks: subtasks,
    };
    console.log(data);
    await patchTask(taskId, data)
      .then((res) => {
        if (res.status === 200) {
          console.log("YEAH");
        } else {
          console.log(res.status);
        }
      })
      .catch((res) => {});
  };

  return (
    <Box sx={{ margin: "40px 0px 0px 40px" }}>
      <Grid container spacing={1}>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}></Grid>
          <Grid item xs={valueXS}>
            <Typography variant="h5">タスク編集</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>タイトル</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              autoFocus
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            ></TextField>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>期限</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ja}
            >
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="yyyy/MM/dd"
                value={deadline}
                onChange={deadlineHandler}
                renderInput={(params: object) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>公開設定</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="public"
              name="radio-buttons-group"
              onChange={publicStateHandler}
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="公開"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="非公開"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>担当者</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <FormControl fullWidth>
              <Select value={assigneeId} onChange={assigneeEmailHandler}>
                {userList.map((user) => (
                  <MenuItem value={user.id}>
                    {user.display_name}：{user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>タスク詳細</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={descriptionHandler}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={samllTitleXS}>
            <Typography>サブタスク</Typography>
          </Grid>
          <Grid item xs={valueXS}>
            <Grid
              container
              direction="column"
              justifyContent="space-around"
              alignItems="flex-start"
            >
              <Grid item>
                {subtasks.map((subtask) => (
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Checkbox
                        checked={subtask.completed}
                        onClick={() => {
                          subtaskEditHandler(
                            subtask.id,
                            null,
                            !subtask.completed
                          );
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id={`subtask${subtask.id}`}
                        autoFocus
                        value={subtask.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          subtaskEditHandler(subtask.id, e.target.value, null);
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={subtasksAddHandler}
                >
                  サブタスクの追加
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Button variant="contained" color="success" onClick={editTask}>
          保存
        </Button>
      </Grid>
    </Box>
  );
};

export default EditTask;
