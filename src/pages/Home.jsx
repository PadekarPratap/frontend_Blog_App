import { useEffect, useState } from "react"
import Posts from "../components/Posts"
import axios from 'axios'
import {server} from '../constants/constants'
import { Oval } from "react-loading-icons"

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPosts, setTotoalPosts] = useState(0)  

  useEffect(() =>{
    getAllPosts()
  }, [page])

  const getAllPosts = async () =>{
    setLoading(true)
    try {
      const {data} = await axios.get(`${server}/posts/all?page=${page}`)
      setLoading(false)
      setTotoalPosts(data.postsCount)
      console.log(data)
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
       <div className="my-12 text-center">
        <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)} className="px-5 py-2 bg-[#555555] rounded-tl-full rounded-bl-full text-white border-r border-white disabled:opacity-60">&lt;</button>
        <button disabled={page === Math.floor((totalPosts + 8 - 1) / 8)} onClick={() => setPage(prev => prev + 1)} className="px-5 py-2 bg-[#555555] rounded-tr-full rounded-br-full text-white disabled:opacity-60">&gt;</button> {/* formula for calculation of last page:- Math.floor((totalRecords + recordsPerPage - 1) / recordsPerPage) */}
       </div>
    </div>
  )
}
export default Home