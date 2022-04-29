import { Button, TextField, Link as MaterialLink } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <TextField label="Login" />
      <TextField label="Password" />

      <Button variant="contained" color="primary">
        Login
      </Button>

      <Link to="/register">
        <MaterialLink>Don't have an account? Make one now!</MaterialLink>
      </Link>
    </div>
  );
}

export default Login;
