import { useEffect, useState } from "react"
import Posts from "../components/Posts"
import axios from 'axios'
import {server} from '../constants/constants'
import { Oval } from "react-loading-icons"

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() =>{
    getAllPosts()
  }, [])

  const getAllPosts = async () =>{
    setLoading(true)
    try {
      const {data} = await axios.get(`${server}/posts/all`)
      setLoading(false)
      setPosts(data.posts)
    } catch (err) {
      console.log(err)
      setLoading(false)
    } 
  }

  if(loading){
    return (
      <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <Oval height={'3rem'} stroke="#00c8ff" className="mx-auto" />
        <p className="text-[#00c8ff]">Loading Posts...</p>
      </div>
    )
  }

  return (
    <div className="blog-container mt-[3rem] mb-[5rem]">
       <div className="space-y-5">
        {posts.length === 0 && <p className="text-center text-2xl">No Posts found.</p>}
        {posts.length > 0 && posts.map((post) =>{
          return <Posts key={post._id} {...post} />
        })}
       </div>
    </div>
  )
}
export default Home