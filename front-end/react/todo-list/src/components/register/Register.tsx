import { Button, TextField, Link as MaterialLink } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";

function Register() {
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <TextField label="Login" />
      <TextField label="Password" />

      <Button variant="contained" color="primary">
        Register
      </Button>

      <Link to="/login">
        <MaterialLink>Already having an account? Log in now!</MaterialLink>
      </Link>
    </div>
  );
}

export default Register;
