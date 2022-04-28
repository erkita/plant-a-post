import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useHistory } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    subject: "",
    message: "",
    usdaZone: "",
    lightNeeds: "",
    waterNeeds: "",
    selectedFiles: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const classes = useStyles();

  const clear = () => {
    setCurrentId(0);
    setPostData({
      subject: "",
      message: "",
      usdaZone: "",
      lightNeeds: "",
      waterNeeds: "",
      selectedFiles: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId !== 0) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };

  useEffect(() => {
    if (!post?.subject) {
      clear();
    }
    if (post) {
      setPostData(post);
    }
  }, [post]);

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to create or to like a post.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Edit ${post.subject}` : "Create a post"}
        </Typography>
        <TextField
          name="subject"
          variant="outlined"
          label="Plant Name"
          fullWidth
          value={postData.subject}
          onChange={(e) =>
            setPostData({ ...postData, subject: e.target.value })
          }
        />
        <TextField
          name="usdaZone"
          variant="outlined"
          label="USDA Zone"
          fullWidth
          value={postData.usdaZone}
          onChange={(e) =>
            setPostData({ ...postData, usdaZone: e.target.value })
          }
        />
        <TextField
          name="lightNeeds"
          variant="outlined"
          label="Light Needs"
          fullWidth
          value={postData.lightNeeds}
          onChange={(e) =>
            setPostData({ ...postData, lightNeeds: e.target.value })
          }
        />
        <TextField
          name="waterNeeds"
          variant="outlined"
          label="Water Needs"
          fullWidth
          value={postData.waterNeeds}
          onChange={(e) =>
            setPostData({ ...postData, waterNeeds: e.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
