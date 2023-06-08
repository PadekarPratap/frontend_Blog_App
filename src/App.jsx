import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import RootLayouts from "./layouts/RootLayouts"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreatePost from "./pages/CreatePost"
import SinglePost from "./pages/SinglePost"
import EditPost from "./pages/EditPost"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayouts />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/post/:_id" element={<SinglePost />} />
      <Route path="/post/edit/:id" element={<EditPost />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}
export default App
