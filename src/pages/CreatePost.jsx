import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { formats, modules } from "../components/EditorToolbar";
import { useContext, useState } from "react";
import axios from "axios";
import { server } from "../constants/constants";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../contextStore/ContextProvider";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    summary: "",
    file: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
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
    } else if (post.file === "") {
      setErrors({ file: "Image of the post must be provided!" });
      return;
    }

    const formData = new FormData();

    const { title, summary, file } = post;

    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("file", file);
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/posts/new`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      navigate("/");
      toast.success(data.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (!user) return <Navigate to="/" />;

  return (
    <div className="blog-container my-12">
      <form noValidate onSubmit={handleSubmit}>
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
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;
