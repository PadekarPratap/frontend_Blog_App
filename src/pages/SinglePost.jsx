import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../constants/constants";
import { format } from "date-fns";
import { AppContext } from "../contextStore/ContextProvider";
import { toast } from "react-toastify";

const SinglePost = () => {
  const { _id } = useParams();

  const [post, setPost] = useState({});

  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  const { title, cover, createdBy, updatedAt, content, userId } = post;

  console.log(updatedAt)

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const { data } = await axios.get(`${server}/posts/${_id}`, {
        withCredentials: true,
      });
      setPost(data.post);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) =>{
    try {
        const {data} = await axios.delete(`${server}/posts/delete/${id}`, {withCredentials: true})
        console.log(data)
        toast.success(data.message)
        navigate('/')
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div className="blog-container mt-5 mb-12">
      <div>
        <h1 className="text-4xl font-bold font-kanit">{title}</h1>
      </div>
      <div className="my-8 flex justify-between">
        <span className="text-xl font-semibold font-mono">{createdBy}</span>
        {user._id === userId && (<div className="flex gap-4">
            <button onClick={() => navigate(`/post/edit/${_id}`)} className="px-3 py-2 rounded-md bg-black text-white">Edit Post</button>
            <button onClick={() =>deletePost(_id)} className="px-3 py-2 rounded-md bg-black text-white">Delete Post</button>
        </div>)}
       {updatedAt && <span className="text-gray-500 font-medium">{format(new Date(updatedAt), "LLL dd, yyyy")}</span>}
      </div>
      <div>
        <img
          src={cover?.url}
          alt={title}
          className="w-full h-[500px] object-cover object-center"
        />
      </div>
      <div className="mt-7">
        <div dangerouslySetInnerHTML={{__html: content}} className=".content" />
      </div>
    </div>
  );
};
export default SinglePost;
