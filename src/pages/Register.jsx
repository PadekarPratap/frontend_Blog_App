import axios from "axios";
import { useForm } from "react-hook-form";
import { server } from "../constants/constants";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../contextStore/ContextProvider";

const Register = () => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;
  const [userErr, setUserErr] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const {user} = useContext(AppContext)

  const onRegister = async (values) => {
    setUserErr("");
    setUserCreated(false);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        { ...values },
        { withCredentials: true }
      );
      console.log(data);
      toast.success(data.message);
      setUserCreated(true);
    } catch (err) {
      setUserErr(err.response.data.message);
      console.log(err);
    }
  };

  if (userCreated) return <Navigate to="/login" />;
  if (user) return <Navigate to="/" />;
  return (
    <div className="blog-container">
      <div className="min-h-[calc(100vh-3rem)] flex justify-center items-center">
        <div className="max-w-[400px] w-full">
          <form
            noValidate
            className="space-y-5"
            onSubmit={handleSubmit(onRegister)}
          >
            <h1 className="text-center text-4xl font-bold">Register</h1>
            <div>
              <input
                {...register("user", {
                  required: {
                    value: true,
                    message: "username is a required field!",
                  },
                  validate: {
                    noBlankSpaces: (value) =>
                      /^\S*$/.test(value) ||
                      "username cannot contain blank spaces!",
                  },
                })}
                type="text"
                className={`rounded w-full ${
                  errors.user?.message && "border-red-500"
                } `}
                placeholder="username"
              />
              {errors.user?.message && (
                <p className="error">{errors.user.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is a required field",
                  },
                })}
                type="password"
                className={`rounded w-full ${
                  errors.password?.message && "border-red-500"
                } `}
                placeholder="password"
              />
              {errors.password?.message && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            {userErr && <p className="error">{userErr}</p>}
            <div>
              <button
                disabled={isSubmitting}
                className={`w-full px-4 py-2 bg-[#555] text-white rounded ${
                  isSubmitting && "bg-[#b9b9b9]"
                }`}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
