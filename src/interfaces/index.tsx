export interface SignUpData {
  display_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  display_name: string;
}

export interface TaskData {
  task_id: string;
  name: string;
  deadline: string;
  create_user: string;
  assignee_user?: string;
  public: boolean;
  completed: boolean;
  total_subtask_amount: string;
  finished_subtask_amount: string;
}

export interface TaskWithSubtask {
  name: string;
  description: string;
  deadline: Date;
  assignee_id: number;
  public: boolean;
  subtask: Array<Subtask>;
}

export interface Subtask {
  id: number;
  subtask_description: string;
  subtask_completed: boolean;
}
