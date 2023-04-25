import { useEffect, useState } from "react";
import "./Comment.css";

export default function Comment({ post_id, supabase, user }) {
  const [comments, setComments] = useState(null);
  const [replies, setReplies] = useState(null);
  const [replyValues, setReplyValues] = useState({}); // State variable for reply input field values

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("post_id", post_id);
      setComments(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("replies").select();
      setReplies(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (event) => {
    if (event.target.dataset.user === user.username) {
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq("id", event.target.id);
      if (!error) {
        alert(`Comment has been deleted successfully!`);
        // reload page
        window.location.reload();
      }
    } else {
      alert(
        "You are not authorized to delete this comment, you can only delete comments you created."
      );
    }
  };

  const handleReplyChange = (commentId, event) => {
    // Pass commentId and event as arguments
    const { value } = event.target;
    setReplyValues((prevValues) => ({ ...prevValues, [commentId]: value })); // Update the replyValues state with the new value
  };

  const handleReplySubmit = async (commentId) => {
    // Pass commentId as an argument
    const replyContent = replyValues[commentId]; // Get the reply content from replyValues state using the commentId
    // Use the reply content to submit the reply
    const { data, error } = await supabase.from("replies").insert([
      {
        comment_id: commentId,
        content: replyContent,
        user_id: user.userId,
      },
    ]);
    if (!error) {
      alert("Reply added successfully");
    }
    setReplyValues({});
    window.location.reload();
  };

  return (
    <div className="Comment">
      <h4>Comments</h4>
      {comments == null ? <p>No comments for this post yet</p> : ""}
      {replies &&
        comments &&
        comments.map((comment, index) => {
          const filteredData = replies.filter(
            (reply) => reply.comment_id === comment.id
          );
          return (
            <div className="comment-container" key={index}>
              <p className="comment-user">
                Created by {`@User${comment.user_id}`} |{" "}
                {new Date(comment.created_at).toDateString()}
              </p>
              <p className="comment-content">{comment.content}</p>
              <div className="comment-icons">
                <i
                  class="fa-solid fa-trash"
                  id={comment.id}
                  onClick={handleDelete}
                  data-user={`@Anon${comment.user_id}`}
                ></i>
                <input
                  type="text"
                  placeholder="Add a reply"
                  required
                  value={replyValues[comment.id] || ""} // Get the value from replyValues state using the commentId
                  onChange={(event) => handleReplyChange(comment.id, event)}
                />
                <i
                  class="fa-solid fa-paper-plane"
                  data-comment_id={comment.id}
                  onClick={(event) => handleReplySubmit(comment.id)}
                ></i>
              </div>
              {filteredData.map((data) => {
                return (
                  <div className="reply-container" key={index}>
                    <p className="comment-user">
                      Created by {`@User${data.user_id}`} |{" "}
                      {new Date(data.created_at).toDateString()}
                    </p>
                    <p className="comment-content">{data.content}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
