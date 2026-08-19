import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function PostForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    dispatch(
      addPost({
        id: Date.now(),
        title,
        content,
        likes: 0,
      })
    );

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm;