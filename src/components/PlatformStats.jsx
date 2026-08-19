import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postsSlice";

function PlatformStats() {
  const posts = useSelector(selectAllPosts);

  const totalLikes = posts.reduce(
    (total, post) => total + post.likes,
    0
  );

  return (
    <div className="stats">
      <div>
        <h3>{posts.length}</h3>
        <p>Total Posts</p>
      </div>

      <div>
        <h3>{totalLikes}</h3>
        <p>Total Likes</p>
      </div>
    </div>
  );
}

export default PlatformStats;