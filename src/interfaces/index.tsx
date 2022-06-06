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

export interface User {
  id: number;
  email: string;
  display_name: string;
}

export interface Task {
  task_id: number;
  name: string;
  deadline: Date;
  create_user: string;
  assignee_user?: string;
  public: boolean;
  completed: boolean;
  total_subtask_amount: number;
  finished_subtask_amount: number;
  subtasks: SubTask[];
}

export interface SubTask {
  id: number;
  subtask_description: string;
  subtask_completed: boolean;
}
