import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import isLoggedState from "../../state/isLogged.state";
import tasksState from "../../state/tasks.state";
import Home from "../home/Home";
import Loading from "../loading/Loading";
import Login from "../login/Login";
import Register from "../register/Register";
import "./App.css";

function App() {
  let [isLoading, setIsLoading] = useState(true);
  let [tasks, setTasks] = useRecoilState(tasksState);
  let [isLogged, setIsLogged] = useRecoilState(isLoggedState);

  useEffect(() => {
    async function fetchData() {
      //Get login status
      setIsLogged(true); //DEV

      //Get tasks from a fake API - DEV
      let request = await fetch("https://jsonplaceholder.typicode.com/todos");
      let response = await request.json();

      let serializedTasks = response.map(
        (task: {
          userId: number;
          id: number;
          title: string;
          completed: boolean;
        }) => {
          return {
            id: task.id,
            title: task.title,
            description: task.title,
            status: task.completed,
          };
        }
      );

      setTasks(serializedTasks);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    if (isLogged) {
      return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default App;
