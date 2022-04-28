import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import UserInfo from "./UserInfo";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../actions/authentication.js";
import { useHistory } from "react-router-dom";

const initialUserState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Authentication = () => {
  const classes = useStyles();
  const [hasAccount, setHasAccount] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [userData, setUserData] = useState(initialUserState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasAccount) {
      dispatch(signIn(userData, history));
    } else {
      dispatch(signUp(userData, history));
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setVisiblePassword((prevHasAccount) => !prevHasAccount);
  };

  const handleSignInAndUp = () => {
    setUserData(initialUserState);
    setHasAccount((prevHasAccount) => !prevHasAccount);
    setVisiblePassword(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {hasAccount ? "Sign in" : "Sign up"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!hasAccount && (
              <>
                <UserInfo
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                />
                <UserInfo
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
              </>
            )}
            <UserInfo
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <UserInfo
              name="password"
              label="Password"
              handleChange={handleChange}
              type={visiblePassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {!hasAccount && (
              <UserInfo
                name="confirmPassword"
                label="Confirm password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {hasAccount ? "Sign in" : "Sign up"}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={handleSignInAndUp}>
                {hasAccount ? "Sign up" : "Already have an account? Sign in"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Authentication;