import { atom } from "recoil";

const tasks = atom({
  key: "tasks",
  default: [] as ITask[],
});

async function deleteTask(taskId: string) {
  console.log(taskId);
  //TODO DEV
  throw new Error("Method not implemented.");
}

async function addTask(task: ITask) {
  console.log(task);
  //TODO DEV
  throw new Error("Method not implemented.");
}

async function editTask(taskObj: ITask) {
  console.log(taskObj);
  //TODO DEV
  throw new Error("Method not implemented.");
}

async function markTask(taskId: string, status: boolean) {
  console.log(taskId, status);
  //TODO DEV
  throw new Error("Method not implemented.");
}

async function revertChanges(taskId: string) {
  console.log(taskId);
  //TODO DEV
  throw new Error("Method not implemented.");
}

export default tasks;

export { deleteTask, addTask, editTask, markTask, revertChanges };
