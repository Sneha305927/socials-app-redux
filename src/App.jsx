import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PlatformStats from "./components/PlatformStats";

import { fetchPosts } from "./features/posts/postsSlice";

function App() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="app">

      <header>
        <h1>Socials App</h1>
        <p>
          A social space powered by Redux Toolkit
        </p>
      </header>

      <PlatformStats />

      <PostForm />

      {status === "loading" && (
        <p className="loading">
          Loading posts...
        </p>
      )}

      {status === "failed" && (
        <p className="error">
          {error}
        </p>
      )}

      {status === "succeeded" && (
        <PostList />
      )}

    </div>
  );
}

export default App;