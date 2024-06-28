import { env } from "@/constants/env";

//Would be cool to import response retrun types from nestJs controllers
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE";
  timestamp: Date;
}

const url = `http://${env.HOST_URL}:${env.HOST_PORT}`;

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${url}/tasks`);
  const payload = await res.json();
  if (payload?.error) {
    throw payload;
  }
  return payload;
};

export const postOneTask = async (
  body: Pick<Task, "title" | "description" | "status">
): Promise<Task> => {
  const res = await fetch(`${url}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await res.json();
  if (payload?.error) {
    throw payload;
  }
  return payload;
};
