import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

// Mock asynchronous API
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "Learning Redux Toolkit",
            content:
              "Redux Toolkit makes state management easier and more organized.",
            likes: 10,
            comments: [
              {
                id: 101,
                text: "This is really useful!",
              },
              {
                id: 102,
                text: "Redux is much easier now.",
              },
            ],
          },
          {
            id: 2,
            title: "React and Redux",
            content:
              "React can use Redux to manage data shared between components.",
            likes: 15,
            comments: [
              {
                id: 201,
                text: "Great explanation!",
              },
            ],
          },
          {
            id: 3,
            title: "What is Normalized State?",
            content:
              "Normalization keeps application data structured and reduces unnecessary duplication.",
            likes: 8,
            comments: [],
          },
        ]);
      }, 1000);
    });

    return response;
  }
);

const postsSlice = createSlice({
  name: "posts",

  initialState: postsAdapter.getInitialState({
    status: "idle",
    error: null,
  }),

  reducers: {
    addPost: postsAdapter.addOne,

    deletePost: postsAdapter.removeOne,

    likePost: (state, action) => {
      const post = state.entities[action.payload];

      if (post) {
        post.likes += 1;
      }
    },

    addComment: (state, action) => {
      const { postId, comment } = action.payload;

      const post = state.entities[postId];

      if (post) {
        post.comments.push({
          id: Date.now(),
          text: comment,
        });
      }
    },

    deleteComment: (state, action) => {
      const { postId, commentId } = action.payload;

      const post = state.entities[postId];

      if (post) {
        post.comments = post.comments.filter(
          (comment) => comment.id !== commentId
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.setAll(state, action.payload);
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addPost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
} = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;