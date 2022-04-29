import { atom } from "recoil";

const tasks = atom({
  key: "tasks",
  default: [] as ITask[],
});

export default tasks;
