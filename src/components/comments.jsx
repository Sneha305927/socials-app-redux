import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  addComment,
  deleteComment,
} from "../features/posts/postsSlice";

function Comments({ post }) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleComment = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    dispatch(
      addComment({
        postId: post.id,
        comment: comment.trim(),
      })
    );

    setComment("");
  };

  return (
    <div className="comments-section">

      <h4>
        💬 Comments ({post.comments.length})
      </h4>

      <div className="comments-list">
        {post.comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          post.comments.map((item) => (
            <div className="comment" key={item.id}>
              <div className="comment-content">
                <span className="comment-avatar">
                  👤
                </span>

                <span>{item.text}</span>
              </div>

              <button
                className="delete-comment"
                onClick={() =>
                  dispatch(
                    deleteComment({
                      postId: post.id,
                      commentId: item.id,
                    })
                  )
                }
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <form
        className="comment-form"
        onSubmit={handleComment}
      >
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit">
          Post
        </button>
      </form>

    </div>
  );
}

export default Comments;