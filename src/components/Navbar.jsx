import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../contextStore/ContextProvider";
import axios from "axios";
import { server } from "../constants/constants";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);

  const location = useLocation()
  //console.log(location)
  useEffect( () =>{
    getUser()
  }, [location.pathname])

  const getUser = async () =>{
    try {
      const {data} = await axios.get(`${server}/users/profile`, {withCredentials: true})
      console.log(data)
      setUser(data.user)
    } catch (err) {
      console.log(err)
    }
  }

  const logoutUser = async() =>{
    try {
      const {data} = await axios.get(`${server}/users/logout`, {withCredentials: true})
      console.log(data)
      toast.success(data.message)
      setUser('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="blog-container flex h-12 items-center justify-between">
      <div>
        <Link to="/" className="text-xl font-bold">
          Word Flow
        </Link>
      </div>
      <nav className="space-x-5">
        {user && (
          <>
            <Link to='/create' >Create a New post</Link>
            <button onClick={logoutUser}>Logout</button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="register">Register</Link>
          </>
        )}
      </nav>
    </div>
  );
};
export default Navbar;
