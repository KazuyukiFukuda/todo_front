import { CardActionArea, Grid, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";

import React, { useState, useContext } from "react";
import { TaskData } from "../interfaces";
import { deleteTask, patchTask } from "../lib/api/tasks";
import {
  setEditingTaskIdContext,
  setPageStateContext,
  PageStatus,
} from "./Feed";

const useEditingTaskId = () => useContext(setEditingTaskIdContext);
const useSetPageState = () => useContext(setPageStateContext);

const Task: React.FC<TaskData> = (props) => {
  const [taskStatus, setTaskStatus] = useState<boolean>(props.completed);
  const setTaskId = useEditingTaskId();
  const setPageState = useSetPageState();

  const deleteButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteTask(props.task_id);
  };

  return (
    <div>
      <Card sx={{ margin: "0px 40px 40px 40px" }} elevation={10}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={7}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Grid item>
                  <Typography variant="h4">{props.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    作成者；{props.create_user}　担当者；
                    {props.assignee_user === "" ? props.assignee_user : "なし"}
                  </Typography>
                </Grid>
                <Grid item xs container spacing={3}>
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setTaskId(Number(props.task_id));
                        setPageState(PageStatus.EDITINGTASK);
                      }}
                    >
                      編集
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={deleteButtonHandler}
                    >
                      削除
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
          <Grid item xs={3}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Grid item>
                  <Typography variant="h6">
                    {props.completed ? "完了" : "未完了"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {props.finished_subtask_amount}/
                    {props.finished_subtask_amount}
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={taskStatus}
                        onChange={async () => {
                          await patchTask(Number(props.task_id), {
                            completed: !taskStatus,
                          });
                          await setTaskStatus(!taskStatus);
                        }}
                      />
                    }
                    label={taskStatus ? "完了しました" : "未完了です"}
                  />
                </Grid>
                <Grid item>
                  <Typography>期日；{props.deadline}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Task;
