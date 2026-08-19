import { useDispatch, useSelector } from "react-redux";

import {
  deletePost,
  likePost,
  selectAllPosts,
} from "../features/posts/postsSlice";

import Comments from "./Comments";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);

  return (
    <div className="post-list">

      {posts.map((post) => (
        <div className="post-card" key={post.id}>

          <div className="post-header">
            <div className="profile-circle">
              🌊
            </div>

            <div>
              <h3>{post.title}</h3>
              <span className="post-author">
                Ocean Community
              </span>
            </div>
          </div>

          <p className="post-content">
            {post.content}
          </p>

          <div className="post-actions">

            <button
              className="like-button"
              onClick={() =>
                dispatch(likePost(post.id))
              }
            >
              ❤️ {post.likes}
            </button>

            <button
              className="delete-button"
              onClick={() =>
                dispatch(deletePost(post.id))
              }
            >
              🗑️ Delete
            </button>

          </div>

          <Comments post={post} />

        </div>
      ))}

    </div>
  );
}

export default PostList;