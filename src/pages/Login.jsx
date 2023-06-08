import { useForm } from "react-hook-form";
import axios from 'axios'
import { server } from "../constants/constants";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../contextStore/ContextProvider";

const Login = () => {
  const form = useForm();

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState
  const [userMsg, setUserMsg] = useState('')
  const navigate = useNavigate()

  const {setUser, user} = useContext(AppContext)

  const onLogin = async (values) => {
    setUserMsg('')
    try {
      const {data} = await axios.post(`${server}/users/login`, {...values}, {withCredentials: true})
      console.log(data)
      toast.success(data.message)
      navigate('/')
      setUser(data.user.user)
    } catch (err) {
      console.log(err)
      setUserMsg(err.response.data.message)
    }
  };


  if(user) return <Navigate to='/' />

  return (
    <div className="blog-container">
      <div className="min-h-[calc(100vh-3rem)] flex justify-center items-center">
        <div className="max-w-[400px] w-full">
          <form
            noValidate
            className="space-y-5"
            onSubmit={handleSubmit(onLogin)}
          >
            <h1 className="text-center text-4xl font-bold">Login</h1>
            <div>
              <input
                {...register("user", {
                  required: {
                    value: true,
                    message: "Username is required to login",
                  },
                })}
                type="text"
                className={`rounded w-full ${
                  errors.user?.message && "border-red-500"
                } `}
                placeholder="username"
              />
              {errors.user?.message && <p className="error">{errors.user.message}</p>}
            </div>
            <div>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required to login",
                  },
                })}
                type="password"
                className={`rounded w-full ${
                  errors.password?.message && "border-red-500"
                } `}
                placeholder="password"
              />
              {errors.password?.message && <p className="error">{errors.password.message}</p>}
            </div>
            {userMsg && <p className="error">{userMsg}</p>}
            <div>
              <button disabled={isSubmitting} className={`w-full px-4 py-2 bg-[#555] text-white rounded ${isSubmitting && 'bg-[#b9b9b9]'}`}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
