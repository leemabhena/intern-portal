import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Comment from "./Comment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import YoutubeVideo from "./YoutubeVideo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PostDetails({ supabase, user }) {
  // video modal
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [upVote, setUpvote] = useState();
  const [showComment, setShowComment] = useState(false);
  const [createComment, setCreateComment] = useState(
    " What are your thoughts?"
  );
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id);

      setPost(data[0]);
      setLoading(false);
      setUpvote(data[0].upvote);
    };
    fetchData();
  }, []);

  const handleUpvote = async () => {
    // update upvotes
    const { data, error } = await supabase
      .from("posts")
      .update([{ upvote: upVote + 1 }])
      .eq("id", id);
    setUpvote(upVote + 1);
  };

  const handleDelete = async () => {
    if (post.user === user.username) {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);
      if (!error) {
        alert(`Post has been deleted successfully!`);
        navigate("/");
        window.location.reload();
      }
    } else {
      alert(
        "You are not authorized to delete this post, you can only delete posts you created."
      );
    }
  };

  const handleEdit = () => {
    if (user.username === post.user) {
      navigate(`/update/post/${id}`);
    } else {
      alert(
        "You are not authorized to update this post, you can only update posts you created."
      );
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="PostDetails" style={{ overflowY: "scroll" }}>
      <p className="post-intro">
        Posted by {post.user} | {new Date(post.created_at).toDateString()}
      </p>
      <h2>
        {" "}
        <img src={post.image_url} alt="Company image" /> {post.company_name}
      </h2>
      <p className="job-title">
        {post.job_title} | {post.location}
      </p>
      <p className="job-attr">
        <i className="fa-solid fa-caret-right"></i> {post.pay}{" "}
        <i className="fa-solid fa-caret-right"></i> {post.level}{" "}
        <i className="fa-solid fa-caret-right"></i> {post.work_style}
      </p>
      <p className="job--desc">{post.job_description}</p>
      <div className="posts-icons">
        <div className="icon-rec" onClick={handleUpvote}>
          <i class="fa-solid fa-thumbs-up"></i> &nbsp; {upVote}
        </div>
        <div className="icon-square" onClick={handleDelete}>
          <i class="fa-solid fa-trash"></i>
        </div>
        <div className="icon-square" onClick={handleEdit}>
          <i class="fa-solid fa-pen-to-square"></i>
        </div>

        <div
          className="icon-square"
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          <i class="fa-solid fa-message"></i>
        </div>
        <div className="icon-square" onClick={handleOpen}>
          <i className="fa-solid fa-video"></i>
        </div>
      </div>
      {showComment && (
        <div className="create-comment">
          <textarea
            name="comment"
            id=""
            className="comment-box"
            value={createComment}
            onChange={(event) => setCreateComment(event.target.value)}
          ></textarea>
          <button
            onClick={async () => {
              const { data, error } = await supabase.from("comments").insert([
                {
                  user_id: user.userId,
                  content: createComment,
                  post_id: post.id,
                },
              ]);
              alert("Comment saved");
              setShowComment(!showComment);
              // Need to reload page
              window.location.reload();
            }}
          >
            Save
          </button>
        </div>
      )}
      <Comment supabase={supabase} post_id={post.id} user={user} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {post.video ? (
            <YoutubeVideo videoId={post.video} />
          ) : (
            <p>No video associated with this post</p>
          )}
        </Box>
      </Modal>
    </div>
  );
}
