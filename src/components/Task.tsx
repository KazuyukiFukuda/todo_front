import { CardActionArea, Typography } from "@material-ui/core";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { TaskData } from "../interfaces";

const Task: React.FC<TaskData> = (props) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardActionArea>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography>{props.name}</Typography>
            <Typography>
              作成者；{props.create_user}　担当者；
              {props.assignee_user === "" ? props.assignee_user : "なし"}
            </Typography>
            <div>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => {
                  console.log("edit");
                }}
              >
                編集
              </Button>
              <Button color="error" variant="contained" size="small">
                削除
              </Button>
            </div>
          </CardContent>
        </Box>
        <Box>
          <CardContent>
            <Typography>{props.completed ? "完了" : "未完了"}</Typography>
            <Typography>
              {props.finished_subtask_amount}/{props.finished_subtask_amount}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default Task;
