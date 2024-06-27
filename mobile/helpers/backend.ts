import { env } from "@/constants/env";

const url = `http://${env.HOST_URL}:${env.HOST_PORT}`;
console.log(url)
export const getAllTasks = async () => {
  const res = await fetch(`${url}/tasks`);
  return res.json();
};
