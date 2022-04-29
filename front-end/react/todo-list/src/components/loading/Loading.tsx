import { CircularProgress } from "@mui/material";
import React from "react";

import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.container}>
      <CircularProgress />
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
