import { Add, Check, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import tasksState, {
  addTask,
  deleteTask,
  editTask,
  markTask,
} from "../../state/tasks.state";

import styles from "./Home.module.css";

interface ITaskEditing {
  taskId: string;
  title: string;
  description: string;
}

function Home() {
  let [tasks, setTasks] = useRecoilState(tasksState);

  let [showUndoneTasks, setShowUndoneTasks] = useState(true);
  let [showDoneTasks, setShowDoneTasks] = useState(false);

  let [currentlyEditedTask, setCurrentlyEditedTask] = useState<ITaskEditing>({
    taskId: "",
    title: "",
    description: "",
  });

  let [isCurrentlyAddingNewTask, setIsCurrentlyAddingNewTask] = useState(false);

  const changeEditingMode = (task?: ITask) => {
    if (task) {
      setCurrentlyEditedTask({
        taskId: task.id,
        title: task.title,
        description: task.description,
      });
    } else {
      setCurrentlyEditedTask({
        taskId: "",
        title: "",
        description: "",
      });
    }
  };

  const handleDialogClose = () => {
    setIsCurrentlyAddingNewTask(false);
  };

  return (
    <div className={styles.container}>
      <Fab
        classes={{ root: styles.fab }}
        color="primary"
        onClick={() => {
          setCurrentlyEditedTask({
            taskId: "NEW",
            title: "Nowe zadanie",
            description: "",
          });
          setIsCurrentlyAddingNewTask(true);
        }}
      >
        <Add />
      </Fab>

      <Dialog open={isCurrentlyAddingNewTask} onClose={handleDialogClose}>
        <DialogTitle>Dodaj zadanie</DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <TextField
            label="Tytuł"
            classes={{ root: styles.taskInput }}
            value={currentlyEditedTask.title}
            onChange={(elem) => {
              setCurrentlyEditedTask({
                ...currentlyEditedTask,
                title: elem.target.value ?? "Nowe zadanie",
              });
            }}
          ></TextField>
          <TextField
            label="Opis"
            classes={{ root: styles.taskInput }}
            value={currentlyEditedTask.description}
            onChange={(elem) => {
              setCurrentlyEditedTask({
                ...currentlyEditedTask,
                description: elem.target.value ?? "",
              });
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleDialogClose}>
            Anuluj
          </Button>
          <Button
            color="primary"
            onClick={() => {
              addTask({
                id: "",
                status: false,
                title: currentlyEditedTask.title,
                description: currentlyEditedTask.description,
              });
              setCurrentlyEditedTask({
                taskId: "",
                title: "",
                description: "",
              });

              setIsCurrentlyAddingNewTask(false);
              handleDialogClose();
            }}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>

      <h1>Lista zadań - pozostało: {tasks.filter((e) => e.status).length}</h1>
      <div className="filtering">
        <FormControlLabel
          control={
            <Checkbox
              checked={showUndoneTasks}
              onChange={() => {
                if (showUndoneTasks && !showDoneTasks) return;
                setShowUndoneTasks(!showUndoneTasks);
              }}
            />
          }
          label="Pokaż nieukończone"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showDoneTasks}
              onChange={() => {
                if (showDoneTasks && !showUndoneTasks) return;
                setShowDoneTasks(!showDoneTasks);
              }}
            />
          }
          label="Pokaż ukończone"
        />
      </div>
      {tasks
        .filter((e) => {
          if (showUndoneTasks && showDoneTasks) {
            return true;
          }
          if (showUndoneTasks) {
            return !e.status;
          } else if (showDoneTasks) {
            return e.status;
          }
          return false;
        })
        .map((e: ITask) => (
          <div className={styles.task}>
            <Checkbox
              checked={e.status}
              onChange={() => markTask(e.id, !e.status)}
            ></Checkbox>
            {/* Don't use prebuilt Material UI components for purpose - to try puer CSS styling */}
            <div className={styles.taskDetails}>
              {currentlyEditedTask.taskId === e.id ? (
                <>
                  <TextField
                    label="Tytuł"
                    classes={{ root: styles.taskInput }}
                    value={currentlyEditedTask.title}
                    onChange={(elem) => {
                      setCurrentlyEditedTask({
                        ...currentlyEditedTask,
                        title: elem.target.value ?? e.title,
                      });
                    }}
                  ></TextField>
                  <TextField
                    label="Opis"
                    classes={{ root: styles.taskInput }}
                    value={currentlyEditedTask.description}
                    onChange={(elem) => {
                      setCurrentlyEditedTask({
                        ...currentlyEditedTask,
                        description: elem.target.value ?? e.description,
                      });
                    }}
                  ></TextField>
                </>
              ) : (
                <>
                  <span className={styles.taskTitle}>{e.title}</span>
                  <span className={styles.taskDescription}>
                    {e.description}
                  </span>
                </>
              )}
            </div>
            <div className={styles.taskButtons}>
              <IconButton
                onClick={() => {
                  if (currentlyEditedTask.taskId === e.id) {
                    editTask({ ...e, ...currentlyEditedTask });
                    changeEditingMode();
                  } else {
                    changeEditingMode(e);
                  }
                }}
              >
                {currentlyEditedTask.taskId === e.id ? <Check /> : <Edit />}
              </IconButton>
              <IconButton onClick={() => deleteTask(e.id)}>
                <Delete />
              </IconButton>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;
