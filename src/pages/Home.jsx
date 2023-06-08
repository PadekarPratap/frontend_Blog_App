import { useEffect, useState } from "react"
import Posts from "../components/Posts"
import axios from 'axios'
import {server} from '../constants/constants'

const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() =>{
    getAllPosts()
  }, [])

  const getAllPosts = async () =>{
    try {
      const {data} = await axios.get(`${server}/posts/all`)
      setPosts(data.posts)
    } catch (err) {
      console.log(err)
    } 
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