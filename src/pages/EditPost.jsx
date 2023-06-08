import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { formats, modules } from "../components/EditorToolbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../constants/constants";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../contextStore/ContextProvider";

const EditPost = () => {
  const [content, setContent] = useState("");
  const { user } = useContext(AppContext);

  const {id} = useParams()

  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    summary: "",
    file: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updatePost = async (e) => {
    e.preventDefault();
    setErrors({});
    if (post.title === "") {
      setErrors({ title: "Title is a required field!" });
      return;
    } else if (post.summary === "") {
      setErrors({ summary: "Summary is a required field!" });
      return;
    } else if (content === "") {
      setErrors({ content: "Content is a required field!" });
      return;
    }
    // if no file is selected then the previous file will be used by the backend

    const formData = new FormData();

    const { title, summary, file } = post;

    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("file", file);
    setLoading(true);
    try {
        const {data} = await axios.put(`${server}/posts/edit/${id}`, formData, {withCredentials: true})
        console.log(data)
        toast.success(data.message)
        setLoading(false)
        navigate('/')
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() =>{
    getSinglePost()
  }, [])

  const getSinglePost = async () =>{
    try {
        const {data} = await axios.get(`${server}/posts/${id}`, {withCredentials: true})
        console.log(data)
        setPost({title: data.post.title, summary: data.post.summary})
        setContent(data.post.content)
    } catch (err) {
        console.log(err)
    }
  }

  if (!user) return <Navigate to="/" />;

  return (
    <div className="blog-container my-12">
      <form noValidate onSubmit={updatePost}>
        <div>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            placeholder="Title"
            className="post-control"
          />
          {errors?.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="mt-3">
          <input
            value={post.summary}
            onChange={(e) => setPost({ ...post, summary: e.target.value })}
            type="text"
            placeholder="Summary"
            className="post-control"
          />
          {errors?.summary && <p className="error">{errors.summary}</p>}
        </div>
        <div className="mt-3">
          <input
            onChange={(e) => setPost({ ...post, file: e.target.files[0] })}
            type="file"
            className="post-control px-4 py-2 border-2 border-[#6b7280]"
          />
          {errors?.file && <p className="error">{errors.file}</p>}
        </div>
        <div className="mt-3">
          <EditorToolbar />
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
            formats={formats}
          />
          {errors?.content && <p className="error">{errors.content}</p>}
        </div>

        <div className="mt-5">
          <button
            disabled={loading}
            className={`w-full px-4 py-2 bg-[#555] text-white rounded ${
              loading && "disabled:opacity-30"
            }`}
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditPost;