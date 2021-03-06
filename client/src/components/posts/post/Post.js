import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import default_post_bg from "../../../images/default_post_bg.png";
import { likePost, deletePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import PostLikes from "./PostLikes";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id;
  const [likes, setLikes] = useState(post?.likes);
  const hasLikedPost = post.likes.find((like) => like === userId);
  const history = useHistory();

  const getPreviewMessage = () => {
    let show5Percent = post.message.length * 0.05;
    return `${post.message.split(" ").splice(0, show5Percent).join(" ")}...`;
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const goToPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const goEditPost = () => {
    history.push(`/create-a-post/${post._id}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    setCurrentId(id);
    goEditPost();
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        className={classes.postAction}
        onClick={goToPost}
      >
        <CardMedia
          className={classes.cardMedia}
          image={post.selectedFile ? post.selectedFile : default_post_bg}
          title={post.subject}
        />
        {user?.result?._id === post?.user && (
          <div className={classes.button}>
            <Button
              className={classes.editButton}
              onClick={(e) => handleEdit(e, post._id)}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <Typography className={classes.subject} variant="h5" gutterBottom>
          {post.subject}
        </Typography>
        <Typography className={classes.postInfo} variant="body2">
          {post.name} &nbsp;&middot;&nbsp;{moment(post.created).fromNow()}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {getPreviewMessage()}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.postActions}>
        <Button
          className={classes.postActionButton}
          disabled={!user?.result}
          onClick={handleLike}
        >
          {/* <Likes /> */}
          <PostLikes likes={likes} userId={userId} />
        </Button>
        {user?.result?._id === post?.user && (
          <Button
            className={classes.postActionButton}
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon></DeleteIcon>
            &nbsp;Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
