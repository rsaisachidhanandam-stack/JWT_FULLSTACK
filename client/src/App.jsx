// App.jsx (only the important part)
import CreatePost from "./pages/createPost";

// inside <Routes>
<Route
  path="/create-post"
  element={
    <ProtectedRoute>
      <CreatePost />
    </ProtectedRoute>
  }
/>
